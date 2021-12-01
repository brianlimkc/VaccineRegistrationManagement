package testing;

import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;

public class MainTest_defunct

{

	static int shortDelay = 100;
	static int longDelay = 100; // max 750
	static int interCatDelay = 100;

	static String adminEmail = "admin@admin.com";
	static String adminPW = "AAAaaa123";

	public static void main(String[] args) throws NoSuchElementException, InterruptedException {
		
		// Setup chromedriver using WedDriverManager
		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();		
		// driver.manage().window().maximize();

		// Common variables
		ArrayList<String> testCollection = new ArrayList<String>();
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";
		String empty = "";
		String result = "";

		Thread.sleep(3000);

		// Admin Login Test

		String AdminLoginTest = "";

		result = loginTest(driver, adminEmail, adminPW, positiveTestcase);
		AdminLoginTest = "Admin Login Test 1 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AdminLoginTest);
		System.out.println(AdminLoginTest);

		// Add New Doctor Test

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

		result = addDoctor(driver, empty, empty, empty, empty, empty, empty, empty, empty, empty, negativeTestcase);
		AddDocTest = "Add Doc Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);
//		
//		result = addDoctor(driver,DocName,wrongNRIC,DocEmail,DocPassword,DocPassword2,DocContactNum,DocDOB,DocStaffType,DocQualType,negativeTestcase);
//		AddDocTest = "Add Doc Test 2 (INVALID NRIC)  " + result;
//		testCollection.add(AddDocTest);
//		System.out.println(AddDocTest);
//		
//		result = addDoctor(driver,DocName,DocNRIC,wrongEmail,DocPassword,DocPassword2,DocContactNum,DocDOB,DocStaffType,DocQualType,negativeTestcase);
//		AddDocTest = "Add Doc Test 3 (INVALID EMAIL)  " + result;
//		testCollection.add(AddDocTest);
//		System.out.println(AddDocTest);
//		
//		result = addDoctor(driver,DocName,DocNRIC,DocEmail,wrongPassword,DocPassword2,DocContactNum,DocDOB,DocStaffType,DocQualType,negativeTestcase);
//		AddDocTest = "Add Doc Test 4 (INVALID PASSWORD)  " + result;
//		testCollection.add(AddDocTest);
//		System.out.println(AddDocTest);
//		
//		result = addDoctor(driver,DocName,DocNRIC,DocEmail,DocPassword,wrongPassword2,DocContactNum,DocDOB,DocStaffType,DocQualType,negativeTestcase);
//		AddDocTest = "Add Doc Test 5 (NON MATCHING PASSWORD)  " + result;
//		testCollection.add(AddDocTest);
//		System.out.println(AddDocTest);
//		
//		result = addDoctor(driver,DocName,DocNRIC,DocEmail,DocPassword,DocPassword2,wrongContactNum,DocDOB,DocStaffType,DocQualType,negativeTestcase);
//		AddDocTest = "Add Doc Test 6 (INVALID CONTACT)  " + result;
//		testCollection.add(AddDocTest);
//		System.out.println(AddDocTest);
//		
//		result = addDoctor(driver,DocName,DocNRIC,DocEmail,DocPassword,DocPassword2,DocContactNum,wrongDOB,DocStaffType,DocQualType,negativeTestcase);
//		AddDocTest = "Add Doc Test 7 (INVALID DOB)  " + result;
//		testCollection.add(AddDocTest);
//		System.out.println(AddDocTest);

		result = addDoctor(driver, DocName, DocNRIC, DocEmail, DocPassword, DocPassword2, DocContactNum, DocDOB,
				DocStaffType, DocQualType, positiveTestcase);
		AddDocTest = "Add Doc Test 8 (POSITIVE TEST CASE - ADD DOC 1)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);

		result = addDoctor(driver, DocName2, DocNRIC2, DocEmail2, DocPassword, DocPassword2, DocContactNum2, DocDOB2,
				DocStaffType2, DocQualType2, positiveTestcase);
		AddDocTest = "Add Doc Test 4 (POSITIVE TEST CASE 2 - ADD DOC 2)  " + result;
		testCollection.add(AddDocTest);
		System.out.println(AddDocTest);

		Thread.sleep(interCatDelay);

		// Approve Doc Test

		String ApproveDocTest = "";

		result = toggleDocApprovalTest(driver, DocName, true, positiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 1 (TOGGLE APPROVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);

//		result = toggleDocApprovalTest(driver,DocName,false,positiveTestcase);
//		ApproveDocTest = "Toggle Doc Approval 2 (TOGGLE NEGATIVE TEST)  " + result;
//		testCollection.add(ApproveDocTest);
//		System.out.println(ApproveDocTest);
//		
//		result = toggleDocApprovalTest(driver,DocName,true,positiveTestcase);
//		ApproveDocTest = "Toggle Doc Approval 3 (TOGGLE APPROVE TEST)  " + result;
//		testCollection.add(ApproveDocTest);
//		System.out.println(ApproveDocTest);

		result = toggleDocApprovalTest(driver, DocName2, true, positiveTestcase);
		ApproveDocTest = "Toggle Doc Approval 4 (TOGGLE APPROVE TEST)  " + result;
		testCollection.add(ApproveDocTest);
		System.out.println(ApproveDocTest);

		Thread.sleep(interCatDelay);

		// Add New Center Test

		String AddCenterTest = "";

		String centerName = "Test Medical Center";
		String centerShotType = "Pfizer";
		String centerAddress = "ABC Central Blk 123";
		String centerPostal = "666666";
		String centerContactNum = "88888888";

		String wrongShotType = "";
		String wrongPostal = "abcdef";

		result = addCenter(driver, empty, empty, empty, empty, empty, negativeTestcase);
		AddCenterTest = "Add Center Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(AddCenterTest);
		System.out.println(AddCenterTest);
//		
//		result = addCenter(driver,centerName,wrongShotType,centerAddress,centerPostal,centerContactNum,negativeTestcase);
//		AddCenterTest = "Add Center Test 2 (INVALID SHOTTYPE)  " + result;
//		testCollection.add(AddCenterTest);
//		System.out.println(AddCenterTest);
//		
//		result = addCenter(driver,centerName,centerShotType,centerAddress,wrongPostal,centerContactNum,negativeTestcase);
//		AddCenterTest = "Add Center Test 3 (INVALID POSTAL CODE)  " + result;
//		testCollection.add(AddCenterTest);
//		System.out.println(AddCenterTest);
//		
//		result = addCenter(driver,centerName,centerShotType,centerAddress,centerPostal,wrongContactNum,negativeTestcase);
//		AddCenterTest = "Add Center Test 4 (INVALID CONTACT NUMBER)  " + result;
//		testCollection.add(AddCenterTest);
//		System.out.println(AddCenterTest);

		result = addCenter(driver, centerName, centerShotType, centerAddress, centerPostal, centerContactNum,
				positiveTestcase);
		AddCenterTest = "Add Center Test 5 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddCenterTest);
		System.out.println(AddCenterTest);

		// Edit Center Test

		String EditCenterTest = "";

		result = editCenter(driver, centerName, empty, empty, empty, empty, empty, negativeTestcase);
		EditCenterTest = "Edit Center Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(EditCenterTest);
		System.out.println(EditCenterTest);
//		
//		result = editCenter(driver,centerName,centerName,wrongShotType,centerAddress,centerPostal,centerContactNum,negativeTestcase);
//		EditCenterTest = "Edit Center Test 2 (INVALID SHOTTYPE)  " + result;
//		testCollection.add(EditCenterTest);
//		System.out.println(EditCenterTest);
//		
//		result = editCenter(driver,centerName,centerName,centerShotType,centerAddress,wrongPostal,centerContactNum,negativeTestcase);
//		EditCenterTest = "Edit Center Test 3 (INVALID POSTAL CODE)  " + result;
//		testCollection.add(EditCenterTest);
//		System.out.println(EditCenterTest);
//		
//		result = editCenter(driver,centerName,centerName,centerShotType,centerAddress,centerPostal,wrongContactNum,negativeTestcase);
//		EditCenterTest = "Edit Center Test 4 (INVALID CONTACT NUMBER)  " + result;
//		testCollection.add(EditCenterTest);
//		System.out.println(EditCenterTest);

		result = editCenter(driver, centerName, centerName, centerShotType, centerAddress, centerPostal,
				centerContactNum, positiveTestcase);
		EditCenterTest = "Edit Center Test 5 (POSITIVE TESTCASE)  " + result;
		testCollection.add(EditCenterTest);
		System.out.println(EditCenterTest);

		Thread.sleep(interCatDelay);

		// Add Room Test

		String roomName = "Room 1";
		String roomName2 = "Room 2";

		String AddRoomTest = "";

		result = addRoom(driver, centerName, empty, negativeTestcase);
		AddRoomTest = "Add Room Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(AddRoomTest);
		System.out.println(AddRoomTest);

		result = addRoom(driver, centerName, roomName, positiveTestcase);
		AddRoomTest = "Add Room Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddRoomTest);
		System.out.println(AddRoomTest);

		result = addRoom(driver, centerName, roomName2, positiveTestcase);
		AddRoomTest = "Add Room Test 3 (POSITIVE TEST CASE)  " + result;
		testCollection.add(AddRoomTest);
		System.out.println(AddRoomTest);

		Thread.sleep(interCatDelay);

		// Edit Room Test

		String RoomNameEdit = "Room 1";

		String EditRoomTest = "";

		result = editRoom(driver, centerName, roomName, empty, negativeTestcase);
		EditRoomTest = "Edit Room Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(EditRoomTest);
		System.out.println(EditRoomTest);

		result = editRoom(driver, centerName, roomName, RoomNameEdit, positiveTestcase);
		EditRoomTest = "Edit Room Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(EditRoomTest);
		System.out.println(EditRoomTest);

		Thread.sleep(interCatDelay);

		// Assign Doc to Roster Test

		String AssignDocRosterTest = "";
		String setEmpty = "Set to Empty";

		result = adminAsignDocTest(driver, DocName, centerName, roomName, positiveTestcase);
		AssignDocRosterTest = "Admin Assign Doc to Room Test 1 (SET ROOM 1)  " + result;
		testCollection.add(AssignDocRosterTest);
		System.out.println(AssignDocRosterTest);

		result = adminAsignDocTest(driver, DocName, centerName, roomName2, positiveTestcase);
		AssignDocRosterTest = "Admin Assign Doc to Room Test 2 (SET ROOM 2)  " + result;
		testCollection.add(AssignDocRosterTest);
		System.out.println(AssignDocRosterTest);

		result = adminAsignDocTest(driver, DocName, setEmpty, setEmpty, positiveTestcase);
		AssignDocRosterTest = "Admin Assign Doc to Room Test 2 (SET TO EMPTY)  " + result;
		testCollection.add(AssignDocRosterTest);
		System.out.println(AssignDocRosterTest);

		Thread.sleep(interCatDelay);

		// Assign Room to Roster Test

		String AssignRoomRosterTest = "";

		result = adminAssignRoomTest(driver, DocName, centerName, roomName, positiveTestcase);
		AssignRoomRosterTest = "Admin Assign Room to Doc Test 1 (SET DOC 1)  " + result;
		testCollection.add(AssignRoomRosterTest);
		System.out.println(AssignRoomRosterTest);

		result = adminAssignRoomTest(driver, DocName2, centerName, roomName, positiveTestcase);
		AssignRoomRosterTest = "Admin Assign Room to Doc Test 2 (SET DOC 2)  " + result;
		testCollection.add(AssignRoomRosterTest);
		System.out.println(AssignRoomRosterTest);

		result = adminAssignRoomTest(driver, setEmpty, centerName, roomName, positiveTestcase);
		AssignRoomRosterTest = "Admin Assign Room to Doc Test 3 (SET TO EMPTY)  " + result;
		testCollection.add(AssignRoomRosterTest);
		System.out.println(AssignRoomRosterTest);

		Thread.sleep(interCatDelay);

		// Delete Doc Test

		String DeleteDoctTest = "";

		result = deleteDoctor(driver, DocName, positiveTestcase);
		DeleteDoctTest = "Delete Doc Test 1 (POSITIVE TEST CASE)  " + result;
		testCollection.add(DeleteDoctTest);
		System.out.println(DeleteDoctTest);

		result = deleteDoctor(driver, DocName2, positiveTestcase);
		DeleteDoctTest = "Delete Doc Test 2 (POSITIVE TEST CASE)  " + result;
		testCollection.add(DeleteDoctTest);
		System.out.println(DeleteDoctTest);

		Thread.sleep(interCatDelay);

		// Delete Room Test

		String DeleteRoomTest = "";

		result = deleteRoom(driver, centerName, roomName, positiveTestcase);
		DeleteRoomTest = "Delete Room Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(DeleteRoomTest);
		System.out.println(DeleteRoomTest);

		result = deleteRoom(driver, centerName, roomName2, positiveTestcase);
		DeleteRoomTest = "Delete Room Test 2 (Empty ALL FIELDS)  " + result;
		testCollection.add(DeleteRoomTest);
		System.out.println(DeleteRoomTest);

		Thread.sleep(interCatDelay);

		// Delete Center Test

		String DeleteCenterTest = "";

		result = deleteCenter(driver, centerName, positiveTestcase);
		DeleteCenterTest = "Delete Center Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(DeleteCenterTest);
		System.out.println(DeleteCenterTest);

		Thread.sleep(interCatDelay);

		// Logout test

		String AdminLogoutTest = "";

		result = logoutTest(driver, positiveTestcase);
		AdminLogoutTest = "Admin Logout Test 1 (REGULAR LOGOUT)  " + result;
		System.out.println(AdminLogoutTest);
		testCollection.add(AdminLogoutTest);

		Thread.sleep(interCatDelay);

		Thread.sleep(longDelay);

		// Register Test
		String RegisterTest = "";

		String rightName = "Dr John Doe";
		String rightNRIC = "S1627678B";
		String rightEmail = "johndoe@cmail.com";
		String rightPassword = "AAAaaa123";
		String rightPassword2 = "AAAaaa123";
		String rightContactNum = "88888888";
		String rightDOB = "01011990";
		String rightStaffType = "Doctor";
		String rightQualType = "MD";

		String wrongNRIC = "S1342324Q";
		String wrongEmail = "abcxyz";
		String wrongPassword = "12345";
		String wrongPassword2 = "123456";
		String wrongContactNum = "abcdefg";
		String wrongDOB = "01012020";

		result = registerTest(driver, empty, empty, empty, empty, empty, empty, empty, true, empty, empty,
				negativeTestcase);
		RegisterTest = "Register Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(RegisterTest);
		System.out.println(RegisterTest);
//		
//		result = registerTest(driver,rightName,wrongNRIC,rightEmail,rightPassword,rightPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 2 (INVALID NRIC)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);
//		
//		result = registerTest(driver,rightName,rightNRIC,wrongEmail,rightPassword,rightPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 3 (INVALID EMAIL)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);
//		
//		result = registerTest(driver,rightName,rightNRIC,rightEmail,wrongPassword,rightPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 4 (INVALID PASSWORD)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);
//		
//		result = registerTest(driver,rightName,rightNRIC,rightEmail,rightPassword,wrongPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 5 (NON MATCHING PASSWORD)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);
//		
//		result = registerTest(driver,rightName,rightNRIC,rightEmail,rightPassword,rightPassword2,wrongContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 6 (INVALID CONTACT NUM)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);
//		
//		result = registerTest(driver,rightName,rightNRIC,rightEmail,rightPassword,rightPassword2,rightContactNum,wrongDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 7 (INVALID DOB)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);

		result = registerTest(driver, rightName, rightNRIC, rightEmail, rightPassword, rightPassword2, rightContactNum,
				rightDOB, true, rightStaffType, rightQualType, positiveTestcase);
		RegisterTest = "Register Test 8 (POSITIVE TEST CASE)  " + result;
		testCollection.add(RegisterTest);
		System.out.println(RegisterTest);

//		result = registerTest(driver,rightName,rightNRIC,rightEmail,rightPassword,rightPassword2,rightContactNum,rightDOB,true,rightStaffType,rightQualType,negativeTestcase);
//		RegisterTest = "Register Test 9 (DUPLICATE REGISTRATION)  " + result;
//		testCollection.add(RegisterTest);
//		System.out.println(RegisterTest);

		Thread.sleep(interCatDelay);

		// Login Test

		String LoginTest = "";

		result = loginTest(driver, empty, empty, negativeTestcase);
		LoginTest = "Login Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(LoginTest);
		System.out.println(LoginTest);
//
//		result = loginTest(driver,wrongEmail,rightPassword,negativeTestcase);
//		LoginTest = "Login Test 2 (INVALID EMAIL)  " + result;
//		testCollection.add(LoginTest);
//		System.out.println(LoginTest);
//		
//		result = loginTest(driver,rightEmail,wrongPassword,negativeTestcase);
//		LoginTest = "Login Test 3 (INVALID PASSWORD)  " + result;
//		testCollection.add(LoginTest);
//		System.out.println(LoginTest);

		result = loginTest(driver, rightEmail, rightPassword, positiveTestcase);
		LoginTest = "Login Test 4 (POSITIVE TEST CASE)  " + result;
		testCollection.add(LoginTest);
		System.out.println(LoginTest);

		Thread.sleep(interCatDelay);

		// Edit Profile Test

		String editProfileTest = "";

		result = editProfileTest(driver, empty, empty, empty, empty, empty, negativeTestcase);
		editProfileTest = "Edit Profile Test 1 (Empty ALL FIELDS)  " + result;
		testCollection.add(editProfileTest);
		System.out.println(editProfileTest);
//		
//		result = editProfileTest(driver,rightName,wrongEmail,rightPassword,rightPassword,rightContactNum,negativeTestcase);
//		editProfileTest = "Edit Profile Test 2 (INVALID EMAIL)  " + result;
//		testCollection.add(editProfileTest);
//		System.out.println(editProfileTest);
//		
//		result = editProfileTest(driver,rightName,rightEmail,wrongPassword,rightPassword,rightContactNum,negativeTestcase);
//		editProfileTest = "Edit Profile Test 3 (INVALID PASSWORD)  " + result;
//		testCollection.add(editProfileTest);
//		System.out.println(editProfileTest);
//		
//		result = editProfileTest(driver,rightName,rightEmail,rightPassword,wrongPassword,rightContactNum,negativeTestcase);
//		editProfileTest = "Edit Profile Test 4 (NON MATCHING PASSWORD )  " + result;
//		testCollection.add(editProfileTest);
//		System.out.println(editProfileTest);
//		
//		result = editProfileTest(driver,rightName,rightEmail,rightPassword,rightPassword,wrongContactNum,negativeTestcase);
//		editProfileTest = "Edit Profile Test 5 (INVALID CONTACT NUMBER)  " + result;
//		testCollection.add(editProfileTest);
//		System.out.println(editProfileTest);

		result = editProfileTest(driver, rightName, rightEmail, rightPassword, rightPassword, rightContactNum,
				positiveTestcase);
		editProfileTest = "Edit Profile Test 6 (POSITIVE TEST CASE)  " + result;
		testCollection.add(editProfileTest);
		System.out.println(editProfileTest);

		Thread.sleep(interCatDelay);

		// Doctor assign own roster Test

		String AssignDocOwnRosterTest = "";
		String centerNameA = "Radin Mas Community Club";
		String roomNameA = "Room A";
		String centerNameB = "Buona Vista Community Club";
		String roomNameB = "Room 1";

		result = docAssignOwnRosterTest(driver, rightName, centerNameA, roomNameA, negativeTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 1 (SET ROOM 1)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);

		// Login Admin
		loginTest(driver, adminEmail, adminPW, positiveTestcase);

		// Toogle Approval for new Doc
		toggleDocApprovalTest(driver, rightName, true, positiveTestcase);

		// Logout Admin
		logoutTest(driver, positiveTestcase);

		// Login new Doc
		loginTest(driver, rightEmail, rightPassword, positiveTestcase);

		result = docAssignOwnRosterTest(driver, rightName, centerNameA, roomNameA, positiveTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 2 (SET ROOM 1)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);

		result = docAssignOwnRosterTest(driver, rightName, centerNameB, roomNameB, positiveTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 3 (SET ROOM 2)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);

		result = docAssignOwnRosterTest(driver, rightName, setEmpty, setEmpty, positiveTestcase);
		AssignDocOwnRosterTest = "Doc Assign Own Roster Test 4 (SET TO EMPTY)  " + result;
		testCollection.add(AssignDocOwnRosterTest);
		System.out.println(AssignDocOwnRosterTest);

		Thread.sleep(interCatDelay);

		// Logout Test

		result = logoutTest(driver, positiveTestcase);
		String LogoutTest = "";
		LogoutTest = "Logout Test 1 (REGULAR LOGOUT)  " + result;
		System.out.println(LogoutTest);
		testCollection.add(LogoutTest);

		// Delete Profile Test

		loginTest(driver, rightEmail, rightPassword, positiveTestcase);

		String DeleteUserTest = "";

		result = deleteUserTest(driver, positiveTestcase);
		DeleteUserTest = "Delete Test 1 (POSITIVE TEST CASE)  " + result;
		System.out.println(DeleteUserTest);
		testCollection.add(DeleteUserTest);

		Thread.sleep(interCatDelay);

		// write to result file
		try {
			FileWriter myWriter = new FileWriter("TestingResults.txt");
			for (String temp : testCollection) {
				myWriter.write(temp + "\n");
			}
			myWriter.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		// print out results
		for (String temp : testCollection) {
			System.out.println(temp);
		}

		driver.quit();
	}

	public static String registerTest(WebDriver driver, String name, String nric, String email, String pw,
			String confirmPw, String contactNum, String dob, Boolean docReg, String staffType, String qualType,
			String testCase) throws InterruptedException {
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		driver.get("http://localhost:3000/register");
		Thread.sleep(shortDelay * 2);
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

			if (staffType != "") {
				driver.findElement(By.xpath("//div[@id = 'staffType']")).click();
				driver.findElement(By.xpath("//li[@data-value = \"" + staffType + "\"]")).click();
				Thread.sleep(shortDelay);
			}

			if (qualType != "") {
				driver.findElement(By.xpath("//div[@id = 'qualificationType']")).click();
				driver.findElement(By.xpath("//li[@data-value = \"" + qualType + "\"]")).click();
				Thread.sleep(shortDelay);
			}

		}

		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);

		String correctAlert = "Registration Successful";

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));

		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;
	}

	public static String loginTest(WebDriver driver, String email, String password, String testCase)
			throws InterruptedException {
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		driver.get("http://localhost:3000/login");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.id("email")).sendKeys(email);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password")).sendKeys(password);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);

		String correctAlert = "Login Successful";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;
	}

	public static String editProfileTest(WebDriver driver, String name, String email, String pw, String confirmPw,
			String contactNum, String testCase) throws InterruptedException

	{
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Profile Edit Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("html/body/div/div/header/div/nav/a")).click();
//		driver.findElement(By.xpath("//a[@id = 'profileLink']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'editProfile']")).click();

		// Pass values into form fields
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys(email);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password")).clear();
		driver.findElement(By.id("password")).sendKeys(pw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("password2")).clear();
		driver.findElement(By.id("password2")).sendKeys(confirmPw);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNum")).clear();
		driver.findElement(By.id("contactNum")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);

		String correctAlert = "Account successfully updated!";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}

		driver.findElement(By.xpath("//button[@id = 'goBack']")).click();
		Thread.sleep(longDelay);
		return results;
	}

	public static String logoutTest(WebDriver driver, String testCase) throws InterruptedException {
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//button[@id = 'menuButton']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//li[@id = 'logoutButton']")).click();
		Thread.sleep(longDelay);
		String correctTitle = "Home Screen";
		String driverTitle = driver.getTitle();

		if (testCase.equals(positiveTestcase)) {
			if (correctTitle.equalsIgnoreCase(driverTitle)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctTitle.equalsIgnoreCase(driverTitle)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;
	}

	public static String deleteUserTest(WebDriver driver, String testCase) throws InterruptedException {
		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'profileLink']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'deleteProfile']")).click();
		Thread.sleep(longDelay);
		String correctAlert = "User has been deleted";

		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;
	}

	public static String addDoctor(WebDriver driver, String name, String nric, String email, String pw,
			String confirmPw, String contactNum, String dob, String staffType, String qualType, String testCase)
			throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);

		// Open Add Doc Modal
		driver.findElement(By.xpath("//button[@id = 'addDoctor']")).click();
		Thread.sleep(shortDelay);

		clickThruModalBG(driver);
		Thread.sleep(shortDelay);

		// Pass values into form fields
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

		if (staffType != "") {
			driver.findElement(By.xpath("//div[@id = 'staffType']")).click();
			driver.findElement(By.xpath("//li[@data-value = \"" + staffType + "\"]")).click();
			Thread.sleep(shortDelay);
		}

		if (qualType != "") {
			driver.findElement(By.xpath("//div[@id = 'qualificationType']")).click();
			driver.findElement(By.xpath("//li[@data-value = \"" + qualType + "\"]")).click();
			Thread.sleep(shortDelay);
		}

		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "New Doctor Added Successfully";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}

		driver.findElement(By.xpath("//button[@id = 'close']")).click();
		Thread.sleep(longDelay);
		return results;

	}

	public static String deleteDoctor(WebDriver driver, String name, String testCase) throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);

		// Open Doc to Delete
		String buttonName = name + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'deleteUser']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "User has been deleted";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String addCenter(WebDriver driver, String name, String shotType, String address, String postal,
			String contactNum, String testCase) throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Pass values into form fields
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
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String editCenter(WebDriver driver, String centerName, String name, String shotType, String address,
			String postal, String contactNum, String testCase) throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Selecting Center to edit
		String buttonName = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'editCenter']")).click();
		Thread.sleep(shortDelay);

		// Pass values into form fields
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("shotType")).clear();
		driver.findElement(By.id("shotType")).sendKeys(shotType);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("streetAddress")).clear();
		driver.findElement(By.id("streetAddress")).sendKeys(address);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("postalCode")).clear();
		driver.findElement(By.id("postalCode")).sendKeys(postal);
		Thread.sleep(shortDelay);
		driver.findElement(By.id("contactNumber")).clear();
		driver.findElement(By.id("contactNumber")).sendKeys(contactNum);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submitEdit']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "Center updated";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String deleteCenter(WebDriver driver, String centerName, String testCase)
			throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Selecting Center to delete
		String buttonName = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);

		// Deleting Center
		driver.findElement(By.xpath("//button[@id = 'deleteCenter']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "Center deleted";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String addRoom(WebDriver driver, String centerName, String roomName, String testCase)
			throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Selecting Center to add Room
		String buttonName = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);

		// Pass values into form fields
		driver.findElement(By.id("name")).sendKeys(roomName);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "Room successfully created";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String editRoom(WebDriver driver, String centerName, String roomName, String name, String testCase)
			throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Selecting Room
		String buttonName = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);
		String buttonName2 = roomName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName2 + "\"]")).click();
		Thread.sleep(shortDelay);

		// Selecting Edit
		driver.findElement(By.xpath("//button[@id = 'editRoom']")).click();
		Thread.sleep(shortDelay);

		// Pass values into form fields
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//button[@id = 'submit']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "Room successfully updated";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String deleteRoom(WebDriver driver, String centerName, String roomName, String testCase)
			throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Centers Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Selecting Room
		String buttonName = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);
		String buttonName2 = roomName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName2 + "\"]")).click();
		Thread.sleep(shortDelay);

		// Selecting Edit
		driver.findElement(By.xpath("//button[@id = 'deleteRoom']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "Room Deleted!";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String toggleDocApprovalTest(WebDriver driver, String name, Boolean approval, String testCase)
			throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);

		// Open Doc to approve
		String buttonName = name + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//button[@id = 'toggleApprove']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = approval ? "Doctor has been approved" : "Doctor has been un-approved";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase))

		{
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String adminAsignDocTest(WebDriver driver, String name, String centerName, String roomName,
			String testCase) throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageUser']")).click();
		Thread.sleep(shortDelay);

		// Open Doc to Assign
		String buttonName = name + " button";
		driver.findElement(By.xpath("//button[@id = \"" + buttonName + "\"]")).click();
		Thread.sleep(shortDelay);

		// Select Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \"" + dateStr + "\"]")).click();
		Thread.sleep(shortDelay);

		// Checks for error Alert for trying to assign un-approved Doctor

		if (driver.findElements(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).isEmpty()) {

			// Select Roster
			String rosterName = "0";
			if (centerName != "Set to Empty") {
				rosterName = centerName + " / " + roomName;
			}

			driver.findElement(By.xpath("//div[@id = 'roomSelect']")).click();
			Thread.sleep(shortDelay);
			driver.findElement(By.xpath("//li[@id = \"" + rosterName + "\"]")).click();
			Thread.sleep(shortDelay);

			clickThruModalBG(driver);
			Thread.sleep(shortDelay);

			driver.findElement(By.xpath("//button[@id = 'assign']")).click();
			Thread.sleep(longDelay);

		}

		// Verifying and returning results
		String correctAlert = "Doctor has been assigned";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase))

		{
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String docAssignOwnRosterTest(WebDriver driver, String name, String centerName, String roomName,
			String testCase) throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Users Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageRoster']")).click();
		Thread.sleep(shortDelay);

		// Select Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \"" + dateStr + "\"]")).click();
		Thread.sleep(shortDelay);

		// Checks for error Alert for trying to assign un-approved Doctor
		if (driver.findElements(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).isEmpty()) {

			// Select Roster
			String rosterName = "0";
			if (centerName != "Set to Empty") {
				rosterName = centerName + " / " + roomName;
			}

			driver.findElement(By.xpath("//div[@id = 'roomSelect']")).click();
			Thread.sleep(shortDelay);
			driver.findElement(By.xpath("//li[@id = \"" + rosterName + "\"]")).click();
			Thread.sleep(shortDelay);

			clickThruModalBG(driver);
			Thread.sleep(shortDelay);

			driver.findElement(By.xpath("//button[@id = 'assign']")).click();
			Thread.sleep(longDelay);

		}

		// Verifying and returning results
		String correctAlert = "Doctor has been assigned";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase))

		{
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

	}

	public static String adminAssignRoomTest(WebDriver driver, String name, String centerName, String roomName,
			String testCase) throws InterruptedException {

		String results = "Results : ";
		String negativeTestcase = "NEGATIVE TESTCASE";
		String positiveTestcase = "POSITIVE TESTCASE";

		// navigating to Manage Center Page
		driver.get("http://localhost:3000");
		Thread.sleep(shortDelay * 2);
		driver.findElement(By.xpath("//a[@id = 'manageCenter']")).click();
		Thread.sleep(shortDelay);

		// Open Center and Room to Assign
		String centerNameButtonID = centerName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + centerNameButtonID + "\"]")).click();
		Thread.sleep(shortDelay);
		String roomNameButtonID = roomName + " button";
		driver.findElement(By.xpath("//button[@id = \"" + roomNameButtonID + "\"]")).click();
		Thread.sleep(shortDelay * 2);

		// Select Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String dateStr = formatter.format(date);
		driver.findElement(By.xpath("//button[@id = \"" + dateStr + "\"]")).click();
		Thread.sleep(shortDelay);

		// Select Doctor
		driver.findElement(By.xpath("//div[@id = 'rosterDoc']")).click();
		Thread.sleep(shortDelay);
		driver.findElement(By.xpath("//li[@id = \"" + name + "\"]")).click();
		Thread.sleep(shortDelay);

		clickThruModalBG(driver);
		Thread.sleep(shortDelay);

		driver.findElement(By.xpath("//button[@id = 'assign']")).click();
		Thread.sleep(longDelay);

		// Verifying and returning results
		String correctAlert = "Room assignment updated";
		WebDriverWait wait = new WebDriverWait(driver, 5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(
				By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")));
		String driverAlert = driver
				.findElement(By.xpath("//div[@class = 'MuiAlert-message css-acap47-MuiAlert-message']")).getText();

		if (testCase.equals(positiveTestcase))

		{
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + positiveTestcase + "]   " + results + " PASSED";
			} else {
				results = "[" + positiveTestcase + "]   " + results + " FAILED";
			}
		}
		if (testCase.equals(negativeTestcase)) {
			if (correctAlert.equalsIgnoreCase(driverAlert)) {
				results = "[" + negativeTestcase + "]   " + results + " FAILED";
			} else {
				results = "[" + negativeTestcase + "]   " + results + " PASSED";
			}
		}
		Thread.sleep(longDelay);
		return results;

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
