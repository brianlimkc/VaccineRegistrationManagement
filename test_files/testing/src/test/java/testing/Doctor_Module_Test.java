package testing;

import org.testng.annotations.Test;
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

public class Doctor_Module_Test {


	static WebDriver driver;
	static WebDriverWait wait;
	static String alertClass = "MuiAlert-message css-acap47-MuiAlert-message";
	

	@Test (priority = 1, dataProvider = "registerData")
	public void registerTest(String name, String nric, String email, String pw,
			String confirmPw, String contactNum, String dob, String staffType, String qualType,
			boolean testCase){

		// Navigate to register link
		driver.get("http://localhost:3000/register");
		
		// Pass values into form fields		
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.id("nric")).sendKeys(nric);
		driver.findElement(By.id("email")).sendKeys(email);
		driver.findElement(By.name("password")).sendKeys(pw);
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		driver.findElement(By.id("date")).sendKeys(dob);
		driver.findElement(By.xpath("//input[@id = 'docReg']")).click();

		if (staffType != "") {
			driver.findElement(By.xpath("//div[@id = 'staffType']")).click();
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//li[@data-value = \"" + staffType + "\"]")));
			driver.findElement(By.xpath("//li[@data-value = \"" + staffType + "\"]")).click();
		}

		if (qualType != "") {
			driver.findElement(By.xpath("//div[@id = 'qualificationType']")).click();
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//li[@data-value = \"" + qualType + "\"]")));
			driver.findElement(By.xpath("//li[@data-value = \"" + qualType + "\"]")).click();
		}
	
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();

		// Getting results
		String correctAlert = "Registration Successful";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);
	}
	
	@Test(priority = 2, dataProvider = "loginData")
	public void loginTest(String email, String password, boolean testCase) {

		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys(email);
		driver.findElement(By.id("password")).sendKeys(password);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();

		String correctAlert = "Login Successful";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();	

		
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);	
	}
	
	@Test (priority = 3, dataProvider = "editProfileData")
	public void editProfileTest(String name, String email, String pw, String confirmPw, String contactNum, boolean testCase) {

		// navigating to Profile Edit Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'profileLink']")));
		driver.findElement(By.xpath("//a[@id = 'profileLink']")).click();
		driver.findElement(By.xpath("//button[@id = 'editProfile']")).click();

		// Pass values into form fields
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys(email);
		driver.findElement(By.id("password")).clear();
		driver.findElement(By.id("password")).sendKeys(pw);
		driver.findElement(By.id("password2")).clear();
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		driver.findElement(By.id("contactNum")).clear();
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();

		String correctAlert = "Account successfully updated!";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();	
		
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);	
	}
	
	
	@Test (priority = 4)
	public void docAssignOwnRosterTestOne() {

		boolean helperResult = docAssignOwnRosterHelper("Dr John Doe", "Radin Mas Community Club", "Room A");
		
		Assert.assertEquals(helperResult, false);	

	}
	
	@Test (priority = 5, dataProvider = "approveDocData")
	public void approveDoc(String name, boolean approval, boolean testCase) {
				
		logout();
		login("admin@admin.com", "AAAaaa123");	

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
		
		logout();
		login("johndoe@cmail.com", "AAAaaa123");	
		
	}

	
	@Test (priority = 8, dataProvider = "assignRosterData")
	public void docAssignOwnRosterTestTwo(String name, String centerName, String roomName, boolean testCase) {

		boolean helperResult = docAssignOwnRosterHelper(name,centerName,roomName);
		
		Assert.assertEquals(helperResult, testCase);	

	}
	
	public boolean docAssignOwnRosterHelper(String name, String centerName, String roomName) {

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'manageRoster']")));
		driver.findElement(By.xpath("//a[@id = 'manageRoster']")).click();

		// Select Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \"" + dateStr + "\"]")).click();

		// Checks for error Alert for trying to assign un-approved Doctor
		if (driver.findElements(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).isEmpty()) {

			// Select Roster
			String rosterName = "0";
			if (centerName != "Set to Empty") {
				rosterName = centerName + " / " + roomName;
			}

			driver.findElement(By.xpath("//div[@id = 'roomSelect']")).click();
			driver.findElement(By.xpath("//li[@id = \"" + rosterName + "\"]")).click();

			clickThruModalBG(driver);

			driver.findElement(By.xpath("//button[@id = 'assign']")).click();

		}

		// Verifying and returning results
		String correctAlert = "Doctor has been assigned";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();	
		
		return driverAlert.equals(correctAlert);
	}
	
	
	@Test (priority = 9, dataProvider = "deleteDocData")
	public void deleteDoctor(String name, boolean testCase){

		// navigating to Manage Profile Page
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id = 'profileLink']")));
		driver.findElement(By.xpath("//a[@id = 'profileLink']")).click();

		// Click on Delete Profile button
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = 'deleteProfile']")));
		driver.findElement(By.xpath("//button[@id = 'deleteProfile']")).click();

		// Getting results results
		String correctAlert = "User has been deleted";
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class = '" + alertClass + "']")));
		String driverAlert = driver.findElement(By.xpath("//div[@class = '" + alertClass + "']")).getText();

		// Assert check
		Assert.assertEquals((driverAlert.equals(correctAlert)), testCase);

	}
	
	@BeforeSuite
	public void initialise() {		
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
		wait = new WebDriverWait(driver, Duration.ofSeconds(2));
	}


	@AfterSuite
	public void end() {
		driver.quit();
	}
		
	public void login(String email, String pw) {
		
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys(email);
		driver.findElement(By.id("password")).sendKeys(pw);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		wait = new WebDriverWait(driver, Duration.ofSeconds(2));
		wait.until(ExpectedConditions.titleContains("Home Screen"));	
		
	}
	
	public void logout() {
		driver.get("http://localhost:3000");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[@id = 'menuButton']")));
		driver.findElement(By.xpath("//button[@id = 'menuButton']")).click();
		driver.findElement(By.xpath("//li[@id = 'logoutButton']")).click();
	}
	
	
	@DataProvider(name = "registerData")
	public Object[][] datasetRegister() {	

		return new Object[][] {
			{ "", "", "", "", "", "", "", "", "", false},
			{ "Dr John Doe", "S1342324Q", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "88888888", "01011990", "Doctor", "MD", false},
			{ "Dr John Doe", "S1627678B", "abcxyz", "AAAaaa123", "AAAaaa123", "88888888", "01011990", "Doctor", "MD", false},
			{ "Dr John Doe", "S1627678B", "johndoe@cmail.com", "12345", "AAAaaa123", "88888888", "01011990", "Doctor", "MD", false},
			{ "Dr John Doe", "S1627678B", "johndoe@cmail.com", "AAAaaa123", "12345", "88888888", "01011990", "Doctor", "MD", false},
			{ "Dr John Doe", "S1627678B", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "abcdefg", "01011990", "Doctor", "MD", false},
			{ "Dr John Doe", "S1627678B", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "88888888", "01012020", "Doctor", "MD", false},
			{ "Dr John Doe", "S1627678B", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "88888888", "01011990", "Doctor", "MD", true},
			{ "Dr John Doe", "S1627678B", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "88888888", "01011990", "Doctor", "MD", false},

		};
	}
	
	
	@DataProvider(name = "deleteDocData")
	public Object[][] datasetDeleteDoc(){
		
		return new Object[][] {
			{"Dr John Doe",true}
			
		};
		
	}
	
	@DataProvider(name = "loginData")
	public Object[][] datasetLogin() {

		return new Object[][] 
		{ 
			{ "", "", false },
			{ "invalidID", "AAAaaa123", false }, 
			{ "johndoe@cmail.com", "invalidPW", false }, 
			{ "johndoe@cmail.com", "AAAaaa123", true }
		};

	}
	
	@DataProvider(name = "editProfileData")
	public Object[][] datasetEditProfile() {

		return new Object[][] 
		{ 
			{ "", "", "", "", "", false},
			{ "Dr John Doe", "abcxyz", "AAAaaa123", "AAAaaa123", "88888888", false},
			{ "Dr John Doe", "johndoe@cmail.com", "12345", "AAAaaa123", "88888888", false},
			{ "Dr John Doe", "johndoe@cmail.com", "AAAaaa123", "12345", "88888888", false},
			{ "Dr John Doe", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "abcdefg", false},
			{ "Dr John Doe", "johndoe@cmail.com", "AAAaaa123", "AAAaaa123", "88888888", true},
		};

	}
	
	@DataProvider(name = "approveDocData")
	public Object[][] datasetApproveDoc(){
		return new Object[][] {
			{"Dr John Doe", true, true}
		};
	}
	
	@DataProvider(name = "assignRosterData")
	public Object[][] datasetAssignRoster() {

		return new Object[][] 
		{ 
			{ "Dr John Doe", "Radin Mas Community Club", "Room A", true},
			{ "Dr John Doe", "Buona Vista Community Club", "Room 1", true},
			{ "Dr John Doe", "Set to Empty", "Set to Empty", true},
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
