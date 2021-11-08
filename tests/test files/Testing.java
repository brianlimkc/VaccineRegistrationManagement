package vaccineRegistrationTest;

import java.io.FileWriter;

import java.text.SimpleDateFormat;  
import java.util.Date;  

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Testing 
{
	
	static int shortDelay = 50;
	static int longDelay = 50;
	static int interCatDelay = 100;	
	
	static String adminEmail = "admin@admin.com";
	static String adminPW = "AAAaaa123";

	
	public static void main(String[] args) throws NoSuchElementException, InterruptedException
	{
		//Directory of chromedriver		
		//create object
		WebDriver driver = new ChromeDriver();
		//go to webpage (local host)
		//driver.manage().window().maximize();
		
		//Common variables
		ArrayList <String> testCollection = new ArrayList<String>();
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		String empty = "";
		String result = "";			
		
		// Register Test
		String RegisterTest = "";
		
		String rightName = "John Doe";
		String rightNRIC = "S1627678B";
		String rightEmail = "johndoe@cmail.com";
		String rightPassword = "AAAaaa123";
		String rightPassword2 = "AAAaaa123";
		String rightContactNum = "88888888";
		String rightDOB = "01011990";
		String rightStaffType = "Doctor";
		String rightQualType = "MD";
		
		String wrongName = "";
		String wrongNRIC = "S1342324Q";
		String wrongEmail = "abcxyz";
		String wrongPassword = "12345";
		String wrongPassword2 = "123456";
		String wrongContactNum = "abcdefg";
		String wrongDOB = "01012020";
		
		result = registerTest(driver,empty,empty,empty,empty,empty,empty,empty,true,empty,empty,negativeTestcase);
		RegisterTest = "Register Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(RegisterTest);
		System.out.println(RegisterTest);
		
		result = registerTest(driver,wrongName,wrongNRIC,wrongEmail,wrongPassword,wrongPassword2,wrongContactNum,wrongDOB,true,empty,empty,negativeTestcase);
		RegisterTest = "Register Test 2 (WRONG ALL FIELDS)  " + result;
		testCollection.add(RegisterTest);
		System.out.println(RegisterTest);
		
		result = registerTest(driver,rightName,rightNRIC,rightEmail,rightPassword,rightPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,postiveTestcase);
		RegisterTest = "Register Test 3 (POSITIVE TEST CASE)  " + result;
		testCollection.add(RegisterTest);
		System.out.println(RegisterTest);
	
		result = registerTest(driver,rightName,rightNRIC,rightEmail,rightPassword,rightPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
		RegisterTest = "Register Test 4 (DUPLICATE REGISTRATION)  " + result;
		testCollection.add(RegisterTest);
		System.out.println(RegisterTest);
	
		Thread.sleep(interCatDelay);		
		
		// Login Test 
		
		String LoginTest = "";
		
		result = loginTest(driver,empty,empty,negativeTestcase);
		LoginTest = "Login Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(LoginTest);
		System.out.println(LoginTest);
			
		result = loginTest(driver,rightEmail,wrongPassword,negativeTestcase);
		LoginTest = "Login Test 2 (WRONG PASSWORD)  " + result;
		testCollection.add(LoginTest);
		System.out.println(LoginTest);
		
		result = loginTest(driver,wrongEmail,rightPassword,negativeTestcase);
		LoginTest = "Login Test 3 (WRONG EMAIL)  " + result;
		testCollection.add(LoginTest);
		System.out.println(LoginTest);
		
		result = loginTest(driver,rightEmail,rightPassword,postiveTestcase);
		LoginTest = "Login Test 4 (POSITIVE TEST CASE)  " + result;
		testCollection.add(LoginTest);
		System.out.println(LoginTest);
		
		Thread.sleep(interCatDelay);	
		
		// Edit Profile Test
		
		String editProfileTest = "";
		
		result = editProfileTest(driver,empty,empty,empty,empty,empty,negativeTestcase);
		editProfileTest = "Edit Profile Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(editProfileTest);
		System.out.println(editProfileTest);
		
		result = editProfileTest(driver,wrongName,wrongEmail,wrongPassword,wrongPassword,wrongContactNum,negativeTestcase);
		editProfileTest = "Edit Profile Test 2 (WRONG ALL FIELDS)  " + result;
		testCollection.add(editProfileTest);
		System.out.println(editProfileTest);
				
		result = editProfileTest(driver,rightName,rightEmail,rightPassword,rightPassword,rightContactNum,postiveTestcase);
		editProfileTest = "Edit Profile Test 3 (POSITIVE TEST CASE)  " + result;
		testCollection.add(editProfileTest);
		System.out.println(editProfileTest);
		
		Thread.sleep(interCatDelay);	
		
		// Logout Test
		
		result = logoutTest(driver, postiveTestcase);
		String LogoutTest = ""; 		
		LogoutTest = "Logout Test 1 (REGULAR LOGOUT)  " + result;
		System.out.println(LogoutTest);
		testCollection.add(LogoutTest);
			
		
		// Add New Doctor Test		
			
		// Login as Admin account
		loginTest(driver,adminEmail,adminPW,postiveTestcase);		
		
		String DocName = "Joyce H Brewton";
		String DocNRIC = "S1330866G";
		String DocEmail = "laurie.reiche@gmail.com";
		String DocPassword = "AAAaaa123";
		String DocPassword2 = "AAAaaa123";
		String DocContactNum = "68524214";
		String DocDOB = "21071985 ";
		String DocStaffType = "Doctor";
		String DocQualType = "MD";
		
		String DocName2 = "Charles B Perry";
		String DocNRIC2 = "S1330866G";
		String DocEmail2 = "franco2008@gmail.com";
		String DocContactNum2 = "68541478";
		String DocDOB2 = "01091975";
		String DocStaffType2 = "Doctor";
		String DocQualType2 = "MD";
		
		
		String AddDocTest = "";		
		
		result = addDoctor(driver,empty,empty,empty,empty,empty,empty,empty,empty,empty,negativeTestcase);
		AddDocTest = "Add Doc Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);
		
		result = addDoctor(driver,wrongName,wrongNRIC,wrongEmail,wrongPassword,wrongPassword2,wrongContactNum,wrongDOB,empty,empty,negativeTestcase);
		AddDocTest = "Add Doc Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);

		
		result = addDoctor(driver,DocName,DocNRIC,DocEmail,DocPassword,DocPassword2,DocContactNum,DocDOB,DocStaffType,DocQualType,postiveTestcase);
		AddDocTest = "Add Doc Test 3 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);
		
		result = addDoctor(driver,DocName2,DocNRIC2,DocEmail2,DocPassword,DocPassword2,DocContactNum2,DocDOB2,DocStaffType2,DocQualType2,postiveTestcase);
		AddDocTest = "Add Doc Test 4 (POSITIVE TEST CASE 2)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);
			
		Thread.sleep(interCatDelay);	
		
		// Approve Doc Test
		
		String ApproveDocTest = "";
		
		result = toggleDocApprovalTest(driver,DocName,true,postiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 1 (TOGGLE APPROVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);
		
		result = toggleDocApprovalTest(driver,DocName,false,postiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 2 (TOGGLE NEGATIVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);
		
		result = toggleDocApprovalTest(driver,DocName,true,postiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 3 (TOGGLE APPROVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);
		
		result = toggleDocApprovalTest(driver,DocName2,true,postiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 4 (TOGGLE APPROVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);
		
		result = toggleDocApprovalTest(driver,rightName,true,postiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 5 (TOGGLE APPROVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);
		
		Thread.sleep(interCatDelay);	
			
		// Add New Center Test		
		
		String centerName = "Test Medical Center";
		String centerShotType = "Pfizer";
		String centerAddress = "ABC Central Blk 123";
		String centerPostal = "666666";
		String centerContactNum = "88888888";
				
		String AddCenterTest = "";		
		
		result = addCenter(driver,empty,empty,empty,empty,empty,negativeTestcase);
		AddCenterTest = "Add Center Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(AddCenterTest);
		System.out.println(AddCenterTest);			
		
		result = addCenter(driver,centerName,centerShotType,centerAddress,centerPostal,centerContactNum,postiveTestcase);
		AddCenterTest = "Add Center Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddCenterTest);
		System.out.println(AddCenterTest);
		
		// Edit Center Test 	
	
		String EditCenterTest = "";
		
		result = editCenter(driver,empty,empty,empty,empty,empty,negativeTestcase);
		EditCenterTest = "Edit Center Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(EditCenterTest);
		System.out.println(EditCenterTest);

		result = editCenter(driver,centerName,centerShotType,centerAddress,centerPostal,centerContactNum,postiveTestcase);
		EditCenterTest = "Edit Center Test 2 (POSITIVE TESTCASE )  " + result;
		testCollection.add(EditCenterTest);
		System.out.println(EditCenterTest);
		
		Thread.sleep(interCatDelay);	
						
		// Add Room Test
				
		String RoomName = "Room 1";
		String RoomName2 = "Room 2";
		
		String AddRoomTest = "";
		
		result = addRoom(driver,empty,negativeTestcase);
		AddRoomTest = "Add Room Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(AddRoomTest);
		System.out.println(AddRoomTest);
		
		result = addRoom(driver,RoomName,postiveTestcase);
		AddRoomTest = "Add Room Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddRoomTest);
		System.out.println(AddRoomTest);
		
		result = addRoom(driver,RoomName2,postiveTestcase);
		AddRoomTest = "Add Room Test 3 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddRoomTest);
		System.out.println(AddRoomTest);	
		
		Thread.sleep(interCatDelay);	
		
		// Edit Room Test
	
		String RoomNameEdit = "Room 1";
		
		String EditRoomTest = "";
		
		result = editRoom(driver,empty,negativeTestcase);
		EditRoomTest = "Edit Room Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(EditRoomTest);
		System.out.println(EditRoomTest);
		
		result = editRoom(driver,RoomNameEdit,postiveTestcase);
		EditRoomTest = "Edit Room Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(EditRoomTest);
		System.out.println(EditRoomTest);			
		
		Thread.sleep(interCatDelay);	
		
		// Assign Doc to Roster Test
		
		String AssignDocRosterTest = "";
		String setEmpty = "Set to Empty";
				
		result = adminAsignDocTest(driver,DocName,centerName,RoomName,postiveTestcase);
		AssignDocRosterTest = "Admin Assign Doc to Room Test 1 (SET ROOM 1)  " + result;
		testCollection.add(AssignDocRosterTest);
		System.out.println(AssignDocRosterTest);
				
		result = adminAsignDocTest(driver,DocName,centerName,RoomName2,postiveTestcase);
		AssignDocRosterTest = "Admin Assign Doc to Room Test 2 (SET ROOM 2)  " + result;
		testCollection.add(AssignDocRosterTest);
		System.out.println(AssignDocRosterTest);
		
		result = adminAsignDocTest(driver,DocName,setEmpty,setEmpty,postiveTestcase);
		AssignDocRosterTest = "Admin Assign Doc to Room Test 2 (SET TO EMPTY)  " + result;
		testCollection.add(AssignDocRosterTest);
		System.out.println(AssignDocRosterTest);
		
		Thread.sleep(interCatDelay);	
		
		// Assign Room to Roster Test
		
		String AssignRoomRosterTest = "";
		
		result = adminAssignRoomTest(driver,DocName,centerName,RoomName,postiveTestcase);
		AssignRoomRosterTest = "Admin Assign Room to Doc Test 1 (SET DOC 1)  " + result;
		testCollection.add(AssignRoomRosterTest);
		System.out.println(AssignRoomRosterTest);
		
		result = adminAssignRoomTest(driver,DocName2,centerName,RoomName,postiveTestcase);
		AssignRoomRosterTest = "Admin Assign Room to Doc Test 2 (SET DOC 2)  " + result;
		testCollection.add(AssignRoomRosterTest);
		System.out.println(AssignRoomRosterTest);
		
		result = adminAssignRoomTest(driver,setEmpty,centerName,RoomName,postiveTestcase);
		AssignRoomRosterTest = "Admin Assign Room to Doc Test 3 (SET TO EMPTY)  " + result;
		testCollection.add(AssignRoomRosterTest);
		System.out.println(AssignRoomRosterTest);
		
		Thread.sleep(interCatDelay);	
				
		// Doctor assign own roster Test
		logoutTest(driver, postiveTestcase);
		loginTest(driver,rightEmail,rightPassword,postiveTestcase); 
		
		String AssignDocOwnRosterTest = "";
			
		result = docAssignOwnRosterTest(driver,rightName,centerName,RoomName,postiveTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 1 (SET ROOM 1)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);
		
		result = docAssignOwnRosterTest(driver,rightName,centerName,RoomName2,postiveTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 2 (SET ROOM 2)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);
		
		result = docAssignOwnRosterTest(driver,rightName,setEmpty,setEmpty,postiveTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 2 (SET TO EMPTY)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);		
			
		logoutTest(driver, postiveTestcase);

		Thread.sleep(interCatDelay);	
		
		// Delete Profile Test
		
		loginTest(driver,rightEmail,rightPassword,postiveTestcase);
			
		String DeleteUserTest = "";
		
		result = deleteUserTest(driver, postiveTestcase);
		DeleteUserTest = "Delete Test 1 (POSITIVE TEST CASE)  " + result;
		System.out.println(DeleteUserTest);
		testCollection.add(DeleteUserTest);	
		
		Thread.sleep(interCatDelay);	
		
		// Delete Doc Test
		
		// Login as Admin account
		loginTest(driver,adminEmail,adminPW,postiveTestcase);	
		
		String DeleteDoctTest = "";
		
		result = deleteDoctor(driver,DocName,postiveTestcase);
		DeleteDoctTest = "Delete Doc Test 1 (POSITIVE TEST CASE)  " + result;
		testCollection.add(DeleteDoctTest);
		System.out.println(DeleteDoctTest);
		
		result = deleteDoctor(driver,DocName2,postiveTestcase);
		DeleteDoctTest = "Delete Doc Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(DeleteDoctTest);
		System.out.println(DeleteDoctTest);
	
		Thread.sleep(interCatDelay);				
		
		// Delete Room Test
			
		String DeleteRoomTest = "";
		
		result = deleteRoom(driver,empty,postiveTestcase);
		DeleteRoomTest = "Delete Room Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(DeleteRoomTest);
		System.out.println(DeleteRoomTest);
		
		Thread.sleep(interCatDelay);	

		// Delete Center Test
				
		String DeleteCenterTest = "";
		
		result = deleteCenter(driver,postiveTestcase);
		DeleteCenterTest = "Delete Center Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(DeleteCenterTest);
		System.out.println(DeleteCenterTest);	
				
		Thread.sleep(interCatDelay);	
		
		// Logout test
			
		result = logoutTest(driver, postiveTestcase);
		LogoutTest = "Logout Test 1 (REGULAR LOGOUT)  " + result;
		System.out.println(LogoutTest);
		testCollection.add(LogoutTest);
		
		Thread.sleep(interCatDelay);	

					
		Thread.sleep(longDelay);
		
		
		
		//write to result file
		try 
		{
			FileWriter myWriter = new FileWriter("TestingResults.txt");
			for(String temp : testCollection)
			{
				myWriter.write(temp + "\n");
			}
			myWriter.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		//print out results
		for(String temp : testCollection)
		{
			System.out.println(temp);
		}
		
		driver.quit();
	}
	
	
	public static String registerTest(WebDriver driver, 
			String name,
			String nric,
			String email, 
			String pw, 
			String confirmPw, 
			String contactNum,
			String dob,
			Boolean docReg,
			String staffType,
			String qualType,			 
			String testCase) throws InterruptedException
	{
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		driver.get("http://localhost:3000/register");
		Thread.sleep(shortDelay*4);
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("nric")).sendKeys(nric);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("email")).sendKeys(email);
		Thread.sleep(shortDelay);
		driver.findElement(By.name("password")).sendKeys(pw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("date")).sendKeys(dob);
		Thread.sleep(shortDelay);
		
		if (docReg) {
			driver.findElement(By.xpath("//input[@id = 'docReg']")).click();
			Thread.sleep(shortDelay);
			
			if (staffType!="") {
				driver.findElement(By.xpath("//div[@id = 'staffType']")).click();
				driver.findElement(By.xpath("//li[@data-value = \""+staffType+"\"]")).click();
				Thread.sleep(shortDelay);
			}
				
			
			if (qualType!="") {
				driver.findElement(By.xpath("//div[@id = 'qualificationType']")).click();
				driver.findElement(By.xpath("//li[@data-value = \""+qualType+"\"]")).click();
				Thread.sleep(shortDelay);
			}			
			
		}
		
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);
			
		
		String correctAlert = "Registration Successful";
				
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
			
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		return results;
	}
	
	
	public static String loginTest(WebDriver driver, 
							String email, 
							String password, 
							String testCase) throws InterruptedException 
	{
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		driver.get("http://localhost:3000/login");
		Thread.sleep(shortDelay*4);
		driver.findElement(By.id("email")).sendKeys(email);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password")).sendKeys(password);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);
		
		
		String correctAlert = "Login Successful";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
	
	
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		return results;
	}
	
	public static String editProfileTest(WebDriver driver, 
			String name,
			String email, 
			String pw, 
			String confirmPw, 
			String contactNum,
			String testCase) throws InterruptedException
	
	{
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		// navigating to Profile Edit Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'profileLink']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'editProfile']")).click();
		
		//Pass values into form fields	
		driver.findElement(By.id("name")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("name")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("email")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("email")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("email")).sendKeys(email);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("password")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("password")).sendKeys(pw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password2")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("password2")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNum")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("contactNum")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submitChange']")).click();
		Thread.sleep(longDelay);
		
		
		String correctAlert = "Account successfully updated!";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
	
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		
		driver.findElement(By.xpath("//button[@id = 'goBack']")).click();
		return results;
	}
	
	public static String logoutTest(WebDriver driver, String testCase) throws InterruptedException
	{
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//button[@id = 'menuButton']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//li[@id = 'logoutButton']")).click();
		Thread.sleep(longDelay);
		String correctTitle = "Home Screen";
		String driverTitle = driver.getTitle();
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctTitle.equalsIgnoreCase(driverTitle))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctTitle.equalsIgnoreCase(driverTitle))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		return results;
	}
	
	public static String deleteUserTest(WebDriver driver, String testCase) throws InterruptedException
	{
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'profileLink']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'deleteProfile']")).click();
		Thread.sleep(longDelay);
		String correctAlert = "User has been deleted";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		return results;
	}
		
	
	public static String addDoctor(WebDriver driver,
			String name,
			String nric,
			String email, 
			String pw, 
			String confirmPw, 
			String contactNum,
			String dob,			
			String staffType,
			String qualType,			 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		// navigating to Manage Users Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);
		
		// Open Add Doc Modal		
		driver.findElement(By.xpath("//button[@id = 'addDoctor']")).click();
		Thread.sleep(shortDelay);
		
		//Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("nric")).sendKeys(nric);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("email")).sendKeys(email);
		Thread.sleep(shortDelay);
		driver.findElement(By.name("password")).sendKeys(pw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("date")).sendKeys(dob);
		Thread.sleep(shortDelay);
		if (staffType!="") {
			driver.findElement(By.xpath("//div[@id = 'staffType']")).click();
			driver.findElement(By.xpath("//li[@data-value = \""+staffType+"\"]")).click();
			Thread.sleep(shortDelay);
		}
					
		if (qualType!="") {
			driver.findElement(By.xpath("//div[@id = 'qualificationType']")).click();
			driver.findElement(By.xpath("//li[@data-value = \""+qualType+"\"]")).click();
			Thread.sleep(shortDelay);
		}	
		
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);
		
		// Verifying and returning results		
		String correctAlert = "New Doctor Added Successfully";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		

		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		
		driver.findElement(By.xpath("//button[@id = 'close']")).click();

		return results;
		
	}
	
	public static String deleteDoctor(WebDriver driver,
			String name,			 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		// navigating to Manage Users Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);
		
		// Open Doc to Delete
		String buttonName = name + " button";
		driver.findElement(By.xpath("//button[@id = \""+buttonName+"\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'deleteUser']")).click();
		Thread.sleep(longDelay);			
		
		// Verifying and returning results		
		String correctAlert = "User has been deleted";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		

		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
			}
			else 
			{
				results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			}
			else 
			{
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		
		return results;
		
	}
	
	
	public static String addCenter(WebDriver driver,
			String name,
			String shotType,
			String address, 
			String postal, 			
			String contactNum,			 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
	
		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
		
		//Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("shotType")).sendKeys(shotType);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("streetAddress")).sendKeys(address);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("postalCode")).sendKeys(postal);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNumber")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);
		
		// Verifying and returning results		
		String correctAlert = "Center created";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
	}
	
	public static String editCenter(WebDriver driver,
			String name,
			String shotType,
			String address, 
			String postal, 			
			String contactNum,			 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
	
		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
				
		// Selecting Center to edit
		driver.findElement(By.xpath("//button[@id = 'Test Medical Center button']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'editCenter']")).click();
		Thread.sleep(shortDelay);
		
		//Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("name")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("shotType")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("shotType")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("shotType")).sendKeys(shotType);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("streetAddress")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("streetAddress")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("streetAddress")).sendKeys(address);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("postalCode")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("postalCode")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("postalCode")).sendKeys(postal);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNumber")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("contactNumber")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("contactNumber")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submitEdit']")).click();
		Thread.sleep(longDelay);
		
		// Verifying and returning results		
		String correctAlert = "Center updated";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
	}
	
	public static String deleteCenter(WebDriver driver,			
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
	
		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
		
		// Selecting Center to delete
		driver.findElement(By.xpath("//button[@id = 'Test Medical Center button']")).click();
		Thread.sleep(shortDelay);
		
		//Deleting Center
		driver.findElement(By.xpath("//button[@id = 'deleteCenter']")).click();
		Thread.sleep(longDelay);
		
		// Verifying and returning results		
		String correctAlert = "Center deleted";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
	}
	
	public static String addRoom(WebDriver driver,
			String name,		 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
		
		// Selecting Center to add Room
		driver.findElement(By.xpath("//button[@id = 'Test Medical Center button']")).click();
		Thread.sleep(shortDelay);
		
		
		//Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);		
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);
		
		
		// Verifying and returning results		
		String correctAlert = "Room successfully created";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}							
		
		return results;
		
		}
		
	public static String editRoom(WebDriver driver,
			String name,		 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
		
		// Selecting Room
		driver.findElement(By.xpath("//button[@id = 'Test Medical Center button']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'Room 1 button']")).click();
		Thread.sleep(shortDelay);
		
		// Selecting Edit
		driver.findElement(By.xpath("//button[@id = 'editRoom']")).click();
		Thread.sleep(shortDelay);
				
		//Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(Keys.COMMAND + "a");
		driver.findElement(By.id("name")).sendKeys(Keys.DELETE);
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);		
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);
		
		// Verifying and returning results		
		String correctAlert = "Room successfully updated";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}							
		
		return results;
		
		}
	
	public static String deleteRoom(WebDriver driver,
			String name,		 
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";
		
		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
		
		// Selecting Room
		driver.findElement(By.xpath("//button[@id = 'Test Medical Center button']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'Room 1 button']")).click();
		Thread.sleep(shortDelay);
		
		// Selecting Edit
		driver.findElement(By.xpath("//button[@id = 'deleteRoom']")).click();
		Thread.sleep(longDelay);	

		
		// Verifying and returning results		
		String correctAlert = "Room Deleted!";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();
		
		
		if(testCase.equals(postiveTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}							
		
		return results;
		
		}
	
	public static String toggleDocApprovalTest(WebDriver driver, 
			String name,
			Boolean approval,
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);
		
		// Open Doc to approve
		String buttonName = name + " button";
		driver.findElement(By.xpath("//button[@id = \""+buttonName+"\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'toggleApprove']")).click();
		Thread.sleep(longDelay);
			
			
		// Verifying and returning results		
		String correctAlert = approval ? "Doctor has been approved" : "Doctor has been un-approved";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();	
		
		if(testCase.equals(postiveTestcase))

		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
	}	
	
	public static String adminAsignDocTest(WebDriver driver, 
			String name,
			String centerName,
			String roomName,
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);
		
		// Open Doc to Assign
		String buttonName = name + " button";
		driver.findElement(By.xpath("//button[@id = \""+buttonName+"\"]")).click();
		Thread.sleep(shortDelay);
		
		// Select Date 
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
	    Date date = new Date();  
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \""+dateStr+"\"]")).click();
		Thread.sleep(shortDelay);
		
		// Select Roster 
		String rosterName = "0";	
		if (centerName != "Set to Empty") {rosterName = centerName + " / "+ roomName;}
		
		driver.findElement(By.xpath("//div[@id = 'roomSelect']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//li[@id = \""+rosterName+"\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'assign']")).click();
		Thread.sleep(longDelay);
			
		// Verifying and returning results		
		String correctAlert = "Doctor has been assigned";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();	
		
		if(testCase.equals(postiveTestcase))

		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
	}
		
	public static String docAssignOwnRosterTest(WebDriver driver, 
			String name,
			String centerName,
			String roomName,
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageRoster']")).click();
		Thread.sleep(shortDelay);
		
		// Select Date 
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
	    Date date = new Date();  
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \""+dateStr+"\"]")).click();
		Thread.sleep(shortDelay);
		
		// Select Roster 
		String rosterName = "0";	
		if (centerName != "Set to Empty") {rosterName = centerName + " / "+ roomName;}
		
		driver.findElement(By.xpath("//div[@id = 'roomSelect']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//li[@id = \""+rosterName+"\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'assign']")).click();
		Thread.sleep(longDelay);
			
		// Verifying and returning results		
		String correctAlert = "Doctor has been assigned";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();	
		
		if(testCase.equals(postiveTestcase))

		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
	}
	
	public static String adminAssignRoomTest(WebDriver driver, 
			String name,
			String centerName,
			String roomName,
			String testCase) throws InterruptedException {
		
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String postiveTestcase = "POSTIVE TESTCASE";

		// navigating to Manage Center Page
		driver.get("http://localhost:3000");	
		Thread.sleep(shortDelay*4);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);
		
		// Open Center and Room to Assign
		String centerNameButtonID = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \""+centerNameButtonID+"\"]")).click();
		Thread.sleep(shortDelay);
		String roomNameButtonID = roomName + " button";
		driver.findElement(By.xpath("//button[@id = \""+roomNameButtonID+"\"]")).click();
		Thread.sleep(shortDelay*4);
		
		// Select Date 
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
	    Date date = new Date();  
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \""+dateStr+"\"]")).click();
		Thread.sleep(shortDelay);		
		
		// Select Doctor 
		driver.findElement(By.xpath("//div[@id = 'rosterDoc']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//li[@id = \""+name+"\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'assign']")).click();
		Thread.sleep(longDelay);
			
		// Verifying and returning results		
		String correctAlert = "Room assignment updated";
		WebDriverWait wait = new WebDriverWait(driver,5);		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']"))); 
		String driverAlert = driver.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();	
		
		if(testCase.equals(postiveTestcase))

		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + postiveTestcase + "]   " + results + " PASSED";
		}
		else 
		{
			results = "[" + postiveTestcase + "]   " + results + " FAILED";
			}
		}
		if(testCase.equals(negativeTestcase))
		{
			if(correctAlert.equalsIgnoreCase(driverAlert))
			{
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
		}
		else 
		{
			results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
			
		return results;
		
		}	
	
	}