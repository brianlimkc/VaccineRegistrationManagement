package testing;

import org.testng.annotations.Test;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterGroups;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeGroups;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import io.github.bonigarcia.wdm.WebDriverManager;

public class Admin_Module_Test {

	static WebDriver driver;
	static WebDriverWait wait;
	static String alertClass = "MuiAlert-message css-acap47-MuiAlert-message";

	@Test(dataProvider = "login", enabled = false)
	public void loginTest(String email, String password, boolean testCase) {

		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys(email);
		driver.findElement(By.id("password")).sendKeys(password);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();

		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();
		driver.close();
		
		String correctAlert = "Login Successful";
		
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);	
	}

	@Test(priority = 1, dataProvider = "addDoc", groups = "addDocTest")
	public void addDoctor(String name, String nric, String email, String pw,
			String confirmPw, String contactNum, String dob, String staffType, String qualType, boolean testCase)
{

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageUser']")));
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();

		// Open Add Doc Modal
		driver.findElement(By.xpath("//button[@id = 'addDoctor']")).click();
		clickThruModalBG(driver);

		// Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.id("nric")).sendKeys(nric);
		driver.findElement(By.id("email")).sendKeys(email);
		driver.findElement(By.name("password")).sendKeys(pw);
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		driver.findElement(By.id("date")).sendKeys(dob);

		if (staffType != "") {
			driver.findElement(By.xpath("//div[@id = 'staffType']")).click();
			driver.findElement(By.xpath("//li[@data-value = \"" + staffType + "\"]")).click();
		}

		if (qualType != "") {
			driver.findElement(By.xpath("//div[@id = 'qualificationType']")).click();
			driver.findElement(By.xpath("//li[@data-value = \"" + qualType + "\"]")).click();
		}

		driver.findElement(By.xpath("//button[@id = 'submit']")).click();

		// Getting results
		String correctAlert = "New Doctor Added Successfully";		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();
		
		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);	


	}
		
	@Test (priority = 2, dataProvider = "approveDoc", groups = "approveDocTest")
	public void approveDoc(String name, boolean approval, boolean testCase) {

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageUser']")));
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		
		// Open Doc to approve		
		String buttonName = name + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = 'toggleApprove']")));
		driver.findElement(By.xpath("//button[@id = 'toggleApprove']")).click();

		// Getting results
		String correctAlert = approval ? "Doctor has been approved" : "Doctor has been un-approved";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);	
		
	}
	
	@Test (priority = 3, dataProvider = "centerData", groups = "addCenterTest")
	public void addCenter(String name, String shotType, String address, String postal,
			String contactNum, boolean testCase) {

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();

		// Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.id("shotType")).sendKeys(shotType);
		driver.findElement(By.id("streetAddress")).sendKeys(address);
		driver.findElement(By.id("postalCode")).sendKeys(postal);
		driver.findElement(By.id("contactNumber")).sendKeys(contactNum);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();

		// Getting results
		String correctAlert = "Center created";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);	

	}
	
	@Test (priority = 4, dataProvider = "centerEditData", groups = "editCenterTest")
	public void editCenter(String centerName, String name, String shotType, String address,
			String postal, String contactNum, boolean testCase) {

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();

		// Selecting Center to edit
		String buttonName = centerName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		driver.findElement(By.xpath("//button[@id = 'editCenter']")).click();

		// Pass values into form fields
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.id("shotType")).clear();
		driver.findElement(By.id("shotType")).sendKeys(shotType);
		driver.findElement(By.id("streetAddress")).clear();
		driver.findElement(By.id("streetAddress")).sendKeys(address);
		driver.findElement(By.id("postalCode")).clear();
		driver.findElement(By.id("postalCode")).sendKeys(postal);
		driver.findElement(By.id("contactNumber")).clear();
		driver.findElement(By.id("contactNumber")).sendKeys(contactNum);
		driver.findElement(By.xpath("//button[@id = 'submitEdit']")).click();

		// Getting results
		String correctAlert = "Center updated";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);
	}
	

	@Test (priority = 5, dataProvider = "roomData", groups = "addRoomTest")
	public void addRoom(String centerName, String roomName, boolean testCase){

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		
		// Selecting Center to add Room
		String buttonName = centerName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		
		// Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(roomName);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		
		// Getting results
		String correctAlert = "Room successfully created";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	@Test (priority = 6, dataProvider = "roomEditData", groups = "editRoomTest")
	public void editRoom(String centerName, String roomName, String name, boolean testCase) {

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();

		// Selecting Room
		String buttonName = centerName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		String buttonName2 = roomName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName2 + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName2 + "\"]")).click();
		
		// Selecting Edit
		driver.findElement(By.xpath("//button[@id = 'editRoom']")).click();
		
		// Pass values into form fields
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		
		// Getting results
		String correctAlert = "Room successfully updated";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	@Test (priority = 7, dataProvider = "assignDocData", groups = "assignDocTest")
	public void adminAsignDocTest(String name, String centerName, String roomName, boolean testCase) {

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageUser']")));
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();

		// Open Doc to Assign
		String buttonName = name + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();

		// Select Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String dateStr = formatter.format(date);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + dateStr + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + dateStr + "\"]")).click();

		// Checks for error Alert for trying to assign un-approved Doctor

		if (driver.findElements(By.xpath("//div[@class = '" + alertClass + "']")).isEmpty()) {

			// Select Roster
			String rosterName = "0";
			if (centerName != "Set to Empty") {
				rosterName = centerName + " / " + roomName;
			}

			driver.findElement(By.xpath("//div[@id = 'roomSelect']")).click();
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//li[@id = \"" + rosterName + "\"]")));
			driver.findElement(By.xpath("//li[@id = \"" + rosterName + "\"]")).click();

			clickThruModalBG(driver);

			driver.findElement(By.xpath("//button[@id = 'assign']")).click();

		}

		// Getting results
		String correctAlert = "Doctor has been assigned";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	@Test (priority = 8, dataProvider = "assignRoomData", groups = "assignRoomTest")
	public void adminAssignRoomTest(String name, String centerName, String roomName, boolean testCase) {

		// navigating to Manage Center Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();

		// Open Center and Room to Assign
		String centerNameButtonID = centerName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + centerNameButtonID + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + centerNameButtonID + "\"]")).click();
		String roomNameButtonID = roomName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + roomNameButtonID + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + roomNameButtonID + "\"]")).click();

		// Select Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String dateStr = formatter.format(date);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + dateStr + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + dateStr + "\"]")).click();

		// Select Doctor
		driver.findElement(By.xpath("//div[@id = 'rosterDoc']")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//li[@id = \"" + name + "\"]")));
		driver.findElement(By.xpath("//li[@id = \"" + name + "\"]")).click();

		clickThruModalBG(driver);

		driver.findElement(By.xpath("//button[@id = 'assign']")).click();

		// Getting results
		String correctAlert = "Room assignment updated";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	
	@Test (priority = 9, dataProvider = "deleteDocData", groups = "deleteDocTest")
	public void deleteDoctor(String name, boolean testCase) {

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageUser']")));
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();

		// Open Doc to Delete
		String buttonName = name + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		driver.findElement(By.xpath("//button[@id = 'deleteUser']")).click();

		// Getting results
		String correctAlert = "User has been deleted";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	@Test (priority = 10, dataProvider = "deleteRoomData", groups = "deleteRoomTest")
	public void deleteRoom(String centerName, String roomName, boolean testCase) {

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();

		// Selecting Room
		String buttonName = centerName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		String buttonName2 = roomName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName2 + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName2 + "\"]")).click();

		// Selecting Edit
		driver.findElement(By.xpath("//button[@id = 'deleteRoom']")).click();

		// Getting results
		String correctAlert = "Room Deleted!";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	@Test (priority = 11, dataProvider = "deleteCenterData", groups = "deleteCenterTest")
	public void deleteCenter(String centerName, boolean testCase) {

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageCenter']")));
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();

		// Selecting Center to delete
		String buttonName = centerName + " button";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = \"" + buttonName + "\"]")));
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();

		// Deleting Center
		driver.findElement(By.xpath("//button[@id = 'deleteCenter']")).click();

		// Getting results
		String correctAlert = "Center deleted";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}

	
	@BeforeSuite
	public void loginAdmin() {
		
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("admin@admin.com");
		driver.findElement(By.id("password")).sendKeys("AAAaaa123");
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		wait = new WebDriverWait(driver, Duration.ofSeconds(2));
		wait.until(ExpectedConditions.titleContains("Home Screen"));
	}


	@AfterSuite
	public void logout() {
		driver.get("http://localhost:3000");
		driver.findElement(By.xpath("//button[@id = 'menuButton']")).click();
		driver.findElement(By.xpath("//li[@id = 'logoutButton']")).click();
		driver.quit();
	}
	
	
	@DataProvider(name = "login")
	public Object[][] datasetLogin() {

		return new Object[][] 
		{ 
			{ "invalidID", "AAAaaa123", false }, 
			{ "admin@admin.com", "invalidPW", false }, 
			{ "admin@admin.com", "AAAaaa123", true }
		};

	}
	
	@DataProvider(name = "addDoc")
	public Object[][] datasetAddDoc() {

		return new Object[][] {
			{ "", "", "", "", "", "", "", "", "", false},
			{ "Joyce H Brewton", "S1342324Q", "laurie.reiche@gmail.com", "AAAaaa123", "AAAaaa123", "68524214", "21071985", "Doctor", "MD", false},
			{ "Joyce H Brewton", "S1330866G", "abcxyz", "AAAaaa123", "AAAaaa123", "68524214", "21071985", "Doctor", "MD", false},
			{ "Joyce H Brewton", "S1330866G", "laurie.reiche@gmail.com", "12345", "AAAaaa123", "68524214", "21071985", "Doctor", "MD", false},
			{ "Joyce H Brewton", "S1330866G", "laurie.reiche@gmail.com", "AAAaaa123", "12345", "68524214", "21071985", "Doctor", "MD", false},
			{ "Joyce H Brewton", "S1330866G", "laurie.reiche@gmail.com", "AAAaaa123", "AAAaaa123", "abcdefg", "21071985", "Doctor", "MD", false},
			{ "Joyce H Brewton", "S1330866G", "laurie.reiche@gmail.com", "AAAaaa123", "AAAaaa123", "68524214", "01012020", "Doctor", "MD", false},			
			{ "Joyce H Brewton", "S1330866G", "laurie.reiche@gmail.com", "AAAaaa123", "AAAaaa123", "68524214", "21071985", "Doctor", "MD", true},
			{ "Charles B Perry", "S1330866G", "franco2008@gmail.com", "AAAaaa123", "AAAaaa123", "68541478", "01091975", "Doctor", "MD", true},

		};
	}
	
	
	@DataProvider(name = "approveDoc")
	public Object[][] datasetApproveDoc(){
		
		return new Object[][] {
			{"Joyce H Brewton", true, true},
			{"Charles B Perry", true, true},
		};
	}

	
	@DataProvider(name = "centerData")
	public Object[][] datasetCenter(){
		
		return new Object[][] {
			{"","","","","", false},
			{"","","","abcdef","", false},
			{"","","","","abcdef", false},			
			{"Test Medical Center","Pfizer","ABC Central Blk 123","666666", "88888888", true},
		};
	}
	
	@DataProvider(name = "centerEditData")
	public Object[][] datasetEditCenter(){
		
		return new Object[][] {
			{"Test Medical Center","","","","","", false},
			{"Test Medical Center","","","","abcdef","", false},
			{"Test Medical Center","","","","","abcdef", false},			
			{"Test Medical Center","Test Medical Center","Pfizer","ABC Central Blk 123","666666", "88888888", true},
		};
	}
	
	@DataProvider(name = "roomData")
	public Object[][] datasetRoom(){
		
		return new Object[][] {
			{"Test Medical Center", "", false},	
			{"Test Medical Center", "Room 1", true},
			{"Test Medical Center", "Room 2", true},
		};	
	}
	
	@DataProvider(name = "roomEditData")
	public Object[][] datasetRoomEdit(){
		
		return new Object[][] {
			{"Test Medical Center", "Room 1", "", true},	
			{"Test Medical Center", "Room 1", "Room 1", true},
		};		
	}
	
	@DataProvider(name = "assignDocData")
	public Object[][] datasetAssignDoc(){
		
		return new Object[][] {
			{"Joyce H Brewton", "Test Medical Center", "Room 1", true},	
			{"Joyce H Brewton", "Test Medical Center", "Room 2", true},
			{"Joyce H Brewton", "Set to Empty", "Set to Empty", true},
		};		
	}
	
	@DataProvider(name = "assignRoomData")
	public Object[][] datasetAssignRoom(){
		
		return new Object[][] {
			{"Joyce H Brewton", "Test Medical Center", "Room 1", true},	
			{"Charles B Perry", "Test Medical Center", "Room 1", true},
			{"Set to Empty", "Test Medical Center", "Room 1", true},
		};
	}
	
	@DataProvider(name = "deleteDocData")
	public Object[][] datasetDeleteDoc(){
		
		return new Object[][] {
			{"Joyce H Brewton", true},	
			{"Charles B Perry", true},
		};
	}
	
	@DataProvider(name = "deleteRoomData")
	public Object[][] datasetDeleteRoom(){
		
		return new Object[][] {
			{"Test Medical Center", "Room 1", true},	
			{"Test Medical Center", "Room 2", true},
		};
	}
	
	@DataProvider(name = "deleteCenterData")
	public Object[][] datasetDeleteCenter(){
		
		return new Object[][] {
			{"Test Medical Center", true},	
		};
	}
		
	
	
	public static void clickThruModalBG(WebDriver driver) {
		Boolean exists = !driver.findElements(By.xpath(
				"//div[@class = 'MuiBackdrop-root MuiBackdrop-invisible css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop']"))
				.isEmpty();
		if (exists) {
			driver.findElement(By.xpath(
					"//div[@class = 'MuiBackdrop-root MuiBackdrop-invisible css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop']"))
					.click();
		}
	}
	
}
