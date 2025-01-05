from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Chemin vers le driver (remplacez par votre chemin)
DRIVER_PATH = r"C:\Users\dell\Dropbox\PC\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe"

# Initialisation du navigateur
service = Service(DRIVER_PATH)
driver = webdriver.Chrome(service=service)
    # Ouvrir le site
# driver.get("https://www.google.com")

base_url = "http://localhost:4200"

# Function to test login
def test_login():
    print("Running login test...")
    driver.get(f"{base_url}/login")  # Navigate to the login page
    wait = WebDriverWait(driver, 10) # it waits for the page to load
    email_field = wait.until(EC.presence_of_element_located((By.ID, "email"))) # i used it only once because it is enough
    email_field.send_keys("amineadmin@esi.dz")
    # driver.find_element(By.ID, "email").send_keys("testuser@gmail.com")
    driver.find_element(By.ID, "password").send_keys("rootroot")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(3)
    # assert "msg" checks if msg text is present in the page source (after the action), if not submission failed
    assert "welcome" in driver.page_source, "Login failed!"
    print("Login test passed!")

# Function to test form submission
def test_formpatient_submission():
    print("Running form submission test...")
    driver.get(f"{base_url}/formpatient")  # Navigate to the form page
    wait = WebDriverWait(driver, 10)
    nom_field = wait.until(EC.presence_of_element_located((By.ID, "nom"))) # i used it only once because it is enough
    nom_field.send_keys("Doe")
    driver.find_element(By.ID, "prenom").send_keys("John")
    driver.find_element(By.ID, "dateNaissance").send_keys("2000-01-01")
    driver.find_element(By.ID, "nss").send_keys("123456789")
    driver.find_element(By.ID, "adresse").send_keys("john.doe@example.com")
    driver.find_element(By.ID, "telephone").send_keys("1234567890")

    driver.find_element(By.ID, "mutuelle").send_keys("HealthCarePlus")
    driver.find_element(By.ID, "numIdentification").send_keys("987654321")

    driver.find_element(By.ID, "personneAconntacterNom").send_keys("Jane")
    driver.find_element(By.ID, "personneAconntacterPrenom").send_keys("Doe")
    driver.find_element(By.ID, "personneAconntacterEmail").send_keys("jane.doe@example.com")
    driver.find_element(By.ID, "personneAconntacterTelephone").send_keys("0987654321")

    # select radio buttons and checkboxes
    oui_field = wait.until(EC.presence_of_element_located((By.ID, "Oui")))
    oui_field.click() 
    diabetes_field = wait.until(EC.presence_of_element_located((By.ID, "Diabète"))) 
    diabetes_field.click()  
    # penecilline_field = wait.until(EC.presence_of_element_located((By.ID, "Penicilline")))
    # penecilline_field.click()
    cardiaque_field = wait.until(EC.presence_of_element_located((By.ID, "Chirurgie cardiaque")))  
    cardiaque_field.click()  
    oui_field = wait.until(EC.presence_of_element_located((By.ID, "Oui")))
    oui_field.click()  

    # Submit the form
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(3)
    # assert "Thank you" in driver.page_source, "Form patient submission failed!"
    print("Form patient submission test passed!")

def test_formconsultation_submission():
    print("Running form submission test...")
    driver.get(f"{base_url}/dpi/consultations-medicales/form-consultation")  # Navigate to the form page
    driver.find_element(By.ID, "name").send_keys("John Doe")
    driver.find_element(By.ID, "email").send_keys("")
    time.sleep(3)
    assert "Thank you" in driver.page_source, "Form consultation submission failed!"
    print("Form consultation submission test passed!")

# Main function to run all tests
def run_all_tests():
    try:
        # test_login()
        test_formpatient_submission()
        # test_formconsultation_submission()
    finally:
        driver.quit()  # Close the browser after tests

# Run the tests
if __name__ == "__main__":
    run_all_tests()
