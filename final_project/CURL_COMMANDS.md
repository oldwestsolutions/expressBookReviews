# cURL Commands for Testing Tasks 1-6

Make sure the server is running on port 5000 before executing these commands.

## Task 1: Get All Books
**Command:**
```bash
curl http://localhost:5000/
```

**Save output to file:**
```bash
curl http://localhost:5000/ > getallbooks.txt
```

**For Windows PowerShell:**
```powershell
curl http://localhost:5000/ | Out-File -FilePath getallbooks.txt
```

---

## Task 2: Get Book by ISBN
**Command:**
```bash
curl http://localhost:5000/isbn/1
```

**Save output to file:**
```bash
curl http://localhost:5000/isbn/1 > getbooksbyISBN.txt
```

**For Windows PowerShell:**
```powershell
curl http://localhost:5000/isbn/1 | Out-File -FilePath getbooksbyISBN.txt
```

**Note:** You can test with different ISBNs (1-10). Example: `/isbn/5` for "The Book Of Job"

---

## Task 3: Get Books by Author
**Command:**
```bash
curl http://localhost:5000/author/Unknown
```

**Save output to file:**
```bash
curl http://localhost:5000/author/Unknown > getbooksbyauthor.txt
```

**For Windows PowerShell:**
```powershell
curl http://localhost:5000/author/Unknown | Out-File -FilePath getbooksbyauthor.txt
```

**Note:** Other authors you can test: "Chinua Achebe", "Jane Austen", "Hans Christian Andersen", etc.

---

## Task 4: Get Books by Title
**Command:**
```bash
curl http://localhost:5000/title/Things%20Fall%20Apart
```

**Save output to file:**
```bash
curl http://localhost:5000/title/Things%20Fall%20Apart > getbooksbytitle.txt
```

**For Windows PowerShell:**
```powershell
curl http://localhost:5000/title/Things%20Fall%20Apart | Out-File -FilePath getbooksbytitle.txt
```

**Note:** URL encode spaces as `%20`. Example: "Pride and Prejudice" becomes "Pride%20and%20Prejudice"

---

## Task 5: Get Book Reviews
**Command:**
```bash
curl http://localhost:5000/review/1
```

**Save output to file:**
```bash
curl http://localhost:5000/review/1 > getbookreview.txt
```

**For Windows PowerShell:**
```powershell
curl http://localhost:5000/review/1 | Out-File -FilePath getbookreview.txt
```

**Note:** Reviews will be empty `{}` initially until reviews are added through the authenticated endpoint.

---

## Task 6: Register New User
**Command:**
```bash
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

**Save output to file:**
```bash
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}" > register.txt
```

**For Windows PowerShell:**
```powershell
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}' | Out-File -FilePath register.txt
```

**Test Cases:**
1. **Successful registration:**
   ```powershell
   curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{\"username\":\"newuser\",\"password\":\"pass123\"}'
   ```

2. **Missing username/password:**
   ```powershell
   curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{\"username\":\"\"}'
   ```

3. **Duplicate username:**
   ```powershell
   curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{\"username\":\"newuser\",\"password\":\"pass123\"}'
   ```
   (Run this twice to test duplicate username error)

---

## How to Run All Commands and Save Outputs (Windows PowerShell)

Run these commands from the `final_project` directory:

```powershell
# Task 1
curl http://localhost:5000/ | Out-File -FilePath getallbooks.txt

# Task 2
curl http://localhost:5000/isbn/1 | Out-File -FilePath getbooksbyISBN.txt

# Task 3
curl http://localhost:5000/author/Unknown | Out-File -FilePath getbooksbyauthor.txt

# Task 4
curl http://localhost:5000/title/Things%20Fall%20Apart | Out-File -FilePath getbooksbytitle.txt

# Task 5
curl http://localhost:5000/review/1 | Out-File -FilePath getbookreview.txt

# Task 6
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}' | Out-File -FilePath register.txt

# Task 7 - Login (must register first!)
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}' | Out-File -FilePath login.txt

# Task 8 - Add/Modify Review (must login first!)
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!" | Out-File -FilePath reviewadded.txt

# Task 9 - Delete Review (must login first!)
curl -X DELETE http://localhost:5000/customer/auth/review/1 | Out-File -FilePath deletereview.txt
```

---

## Task 7: Login as Registered User

**IMPORTANT:** You must register a user first (Task 6) before logging in.

**Command:**
```bash
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

**Save output to file:**
```bash
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}" > login.txt
```

**For Windows PowerShell:**
```powershell
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}' | Out-File -FilePath login.txt
```

**Note:** 
- Use the same username/password you registered in Task 6
- This will create a session with JWT token
- You need to be logged in for Tasks 8 and 9

---

## Task 8: Add or Modify Book Review

**IMPORTANT:** You must be logged in (Task 7) before adding a review.

**Command:**
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!"
```

**Save output to file:**
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!" > reviewadded.txt
```

**For Windows PowerShell:**
```powershell
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!" | Out-File -FilePath reviewadded.txt
```

**Test Cases:**
1. **Add new review:**
   ```powershell
   curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Excellent%20read!"
   ```

2. **Modify existing review (same user):**
   ```powershell
   curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Updated%20review"
   ```
   (Run this after the first command to modify the review)

**Note:** 
- Replace `1` with any ISBN (1-10)
- URL encode spaces in review text as `%20`
- The review is stored with your username from the session

---

## Task 9: Delete Book Review

**IMPORTANT:** You must be logged in (Task 7) and have added a review (Task 8) before deleting.

**Command:**
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1
```

**Save output to file:**
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 > deletereview.txt
```

**For Windows PowerShell:**
```powershell
curl -X DELETE http://localhost:5000/customer/auth/review/1 | Out-File -FilePath deletereview.txt
```

**Note:** 
- You can only delete your own reviews
- Replace `1` with the ISBN of the book whose review you want to delete

---

## Complete Workflow for Tasks 7-9:

```powershell
# Step 1: Register a user (if not already done)
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}'

# Step 2: Login (creates session)
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"password\":\"password123\"}' | Out-File -FilePath login.txt

# Step 3: Add a review
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great%20book!" | Out-File -FilePath reviewadded.txt

# Step 4: Delete the review
curl -X DELETE http://localhost:5000/customer/auth/review/1 | Out-File -FilePath deletereview.txt
```

---

## Notes:
- Make sure the server is running (`npm start` in the final_project directory)
- All files will be saved in the `final_project` directory
- For Windows, PowerShell's `curl` is an alias for `Invoke-WebRequest`. If you need the actual curl.exe, use `curl.exe` instead
- To see both the command and output in the file, you may want to manually copy-paste the command and output

