Assumptions: 
No API endpoint available, we want to test only for UI, the data on the website is correct, ai can be used. 
No need to address ads on the site.
No need for multibrowser testing. ( as in i wont run the automation in safari)

How would I aproach it:

I identifed the main functionalities: 
- The user have access to any and all Countries and VATs. 
    Biggest problem would be: The user can not find a countrz OR the country's VAT is incorrect. 
- The calculations should be correct. 
    Biggest problem: Calculation is incorrect.
- CSV should be able to be downloaded.

The cases I have selected for automation are the ones that are critical, and easy to automate. Would be hard to do by hand, especially the 
    "select all countries and confirm if their VAT is correct"


Ticket: Net can be "123.sdf." and no error is shown after a text is being pressed down.

Testcase: Net is not a number
Steps:

Go to the page.
Type in a NOT NUMBER character in either of the input fields (Prive without VAT, Value-Added Tax, Price incl. VAT)

Result: You will see that you can write in any not number characters. It should not be allowed.

Version: Calkoo x.x
Env: Opera, version X.

{Screenshot attached, Video Attached, Playwright report Attached}
