@WebServlet("/SettingsServlet/*")
public class SettingsServlet extends HttpServlet {

	/**
	 * Serial
	 */
	private static final long serialVersionUID = -5809673003095030140L;
	
	/**
	 * Default Constructor
	 */
	public SettingsServlet(){
		super();
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 * This method will be used to retrieve the pdf menu from the server
	 * 
	 * The request should look like this: 
	 * 			https://54.200.87.142:8443/AppTite/Settings?Command=getMenu&rid=xxxxxx
	 * 				where xxxxx is the restaurant id
	 * 			The rid is sent over to the server to get the filepath from the DB based on the 
	 * 			restaurant. If there are more than one menu, per restaurant, then the menu id needs
	 * 			to be sent over as well. 
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String cmd = request.getParameter("Command");
		if(cmd.equals("getMenu")){
			String rid = request.getParameter("rid");
			// Get the location from storage from the DB
			String location = "";
			// The first part of this if statement is for testing purposed only
			if(rid.equals("test")){
				location= System.getProperty("user.home") + "//AppTite//Menu//1-1.pdf";
			}else{		
				location= Config.sendRequest(new String[]{cmd, rid }, this.getServletContext());
			}
			System.out.println("File location requested: " + location);
			File f = new File( location);
			InputStream is = new FileInputStream(f);
			OutputStream os = response.getOutputStream();
			
			byte[] buffer = new byte[1024*1024];
			int len;
			
			while((len=is.read(buffer)) !=-1){
				os.write(buffer, 0 , len);
			}
			
			os.flush();
			os.close();
			is.close();
		}else if(cmd.equals("getMenuPath")){
			String rid = request.getParameter("rid");
			// Get the location from storage from the DB
			String location = "";
			// The first part of this if statement is for testing purposed only
			if(rid.equals("test")){
				location= System.getProperty("user.home") + "//AppTite//Menu//1-1.pdf";
			}else{		
				location= Config.sendRequest(new String[]{"getMenu", rid }, this.getServletContext());
			}
			File f = new File( location);
			// Get the filename only
			String filename = f.getName();
			response.getWriter().write(filename);
			
		}else if(cmd.equals("getRestaurantSettings")){
			String[] params = new String[]{cmd, request.getParameter("restId")};
			String result = Config.sendRequest(params, this.getServletContext());
			if(result != null && !result.isEmpty()) {
				response.setContentType("text/html;charset=UTF-8");
				response.getWriter().write(result);
			}
			else {
				response.getWriter().write("FAILURE");
			}
		}
	}
	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Get the command
		String cmd = request.getParameter("Command");
		if(cmd != null){
			// Check for save settings or possibly upload file
			
			if(cmd.equals("saveRestaurantSettings")){
				// Get the params
				String[] params = new String[]{cmd, 
						request.getParameter("restId"),
						request.getParameter("Company_Address1"), 
                        request.getParameter("Company_Address2"),
						request.getParameter("City"),
						request.getParameter("State"),
						request.getParameter("Zip"),
						request.getParameter("Company_Phone"),
						request.getParameter("SundayOpen"),
						request.getParameter("SundayClose"),
						request.getParameter("MondayOpen"),
						request.getParameter("MondayClose"),
						request.getParameter("TuesdayOpen"),
						request.getParameter("TuesdayClose"),
						request.getParameter("WednesdayOpen"),
						request.getParameter("WednesdayClose"),
						request.getParameter("ThursdayOpen"),
						request.getParameter("ThursdayClose"),
						request.getParameter("FridayOpen"),
						request.getParameter("FridayClose"),
						request.getParameter("SaturdayOpen"),
						request.getParameter("SaturdayClose"),
						request.getParameter("Delivery"),
						request.getParameter("Tax")
				};
				String result = Config.sendRequest(params, this.getServletContext());
				if(result != null && !result.isEmpty()) {
					response.setContentType("text/html;charset=UTF-8");
					response.getWriter().write(result);
				}
				else {
					response.getWriter().write("FAILURE");
				}
			}
			// Process upload file command
			else if(cmd.equals("uploadMenu")){
				System.out.println("Inside upload portion!");
					// This follows an example from http://www.technicaladvices.com/2011/12/10/ajax-file-upload-to-a-java-servlet-in-html5/
				String result ="";
				String uploaded = "false";
				try {
					System.out.println("Attempting to get files");
					List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
					for(FileItem item : items){
						System.out.println("Looping!!");
						if(item.isFormField()){
							result+= "Field: " + item.getFieldName() + "->" + item.getString() + " was read";
							
							System.out.println("Not a file: " + result);
						}else{
							System.out.println("File");
							String filename = item.getName();
							System.out.println("File name: " +filename);
							InputStream fileStream = item.getInputStream();
							// Location on the server for where the file is
							result=saveFile(fileStream, filename);
							String rest_id = request.getParameter("restId");
							// Send the file location to the server database
							uploaded = Config.sendRequest(new String[]{cmd, rest_id, result}, this.getServletContext());
							
							if(uploaded != null && !uploaded.isEmpty() && !uploaded.equals("false")){
								response.setContentType("text/html;charset=UTF-8");
								response.getWriter().write("SUCCESS");
							}else{
								response.getWriter().write("FAILURE");
							}
						}
					}
				} catch (FileUploadException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (Exception e){
					System.out.println("SOMETHING WENT WRONG!!!");
					System.out.println("Result: " + result);
					System.out.println(e.getMessage());
				}
			} else if (cmd.equals("saveButtonConfiguration")) {
				System.out.println(request.getParameter("config"));
				String[] params = new String[] {cmd, request.getParameter("restId"), request.getParameter("config")};
				String result = Config.sendRequest(params, this.getServletContext());
				if (result != null && !result.isEmpty()) {
					response.setContentType("text/html;charset=UTF-8");
					response.getWriter().write(result);
				}
			} else if (cmd.equals("retrieveMenu")) {
                String[] params = new String[]{cmd, request.getParameter("restId")};
                String result = SettingsHelper.sendRequest(params, this.getServletContext());
                if (result != null && !result.isEmpty()) {
                    response.setContentType("text/html;charset=UTF-8");
                    response.getWriter().write(result);
                } else {
                    response.getWriter().write("FAILURE");
                }
			}
		}
	}
	
	/**
	 * Saves the file to the file system in the home directory of the user. 
	 * @param in - The inputstream of the file that the user requests to upload
	 * @param filename - The name of the file to go on the filesystem, this will be sent to the server database for the location of the file
	 * @return Path to the file saved to the file system
	 */
	private String saveFile(InputStream in, String filename){
		OutputStream out =null;
		String loc = "";
		try{
			// Create the directory where the file will be, create it if it does not exist
			File dir = new File(System.getProperty("user.home") + "//AppTite//Menu//");
			if(!dir.exists()){
				dir.mkdirs();
			}
			// Create the virtual file to be saved on the file system
			File f = new File(System.getProperty("user.home") + "//AppTite//Menu//", filename);
			// This value will be sent up to the database 
			loc = f.getAbsolutePath();
			System.out.println("Location: " + loc);
			// Create an output stream to write the file to
			out = new FileOutputStream(f);
			
			byte[] buffer = new byte[1024*1024];
			int len;
			
			// Write the file
			while((len= in.read(buffer)) !=-1){
				out.write(buffer, 0, len);
			}
			// Something useful for debugging
			System.out.println("File <"+ f.getName()+"> saved to: " + loc);
			
			out.flush();
			out.close();
			in.close();
		}catch(Exception e){
			System.out.println("Something went wrong saving the file");
			System.out.println(e.getMessage());
		}
		
		return loc;
	}
	
}