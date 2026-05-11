# How to setup

1. npm install
2. npm test

3. (Optional, might not be needed, but if the steps are not being recognized by the IDE, and the IDE is a VScode or VScode fork,
   add the following to the cucumber.glue file: "features/*.feature", "step_definitions/*.ts")


# Assumptions

- No API endpoint available
- We want to test only for UI
- The data on the website is correct
- AI can be used
- No need to address ads on the site
- No need for multibrowser testing  
  *(as in I won't run the automation in Safari)*

---

# How would I approach it

I identified the main functionalities:

## 1. The user has access to any and all Countries and VATs

### Biggest problems:
- The user cannot find a country
- The country's VAT is incorrect

---

## 2. The calculations should be correct

### Biggest problem:
- Calculation is incorrect

---

## 3. The user should be able to download the calculation in a format of their choice.

---

# Automation Strategy

The cases I have selected for automation are the ones that are:
- Critical
- Easy to automate
- Hard to verify manually

Especially:

> "Select all countries and confirm if their VAT is correct"

---

# Ticket Example

## Testcase: Net is not a number

### Steps
1. Go to the page
2. Type in a NOT NUMBER character in either of the input fields:
   - Price without VAT
   - Value-Added Tax
   - Price incl. VAT

---

## Result

You will see that you can write in any non-number characters.  
It should not be allowed.

---

## Environment

- App version: Calkoo x.x
- Env: Opera, version X

---

## Attachments

- Screenshot attached
- Video attached
- Playwright report attached


---

# Questions

- I just assumed that the application should not accept not number characters, but I would want a clerification on that. 
- I would push for test-ids, since it makes a huge testing risk to rely on other selector strategies.
- I would ask for a locally runable version / test env, beacause the ads are slowing the site, and timed ad popups would definetly break the site.
- (I would also mention that the site has a bad design in my opinion, example: Switching countries reloads re fetches everything, reloading the site)
