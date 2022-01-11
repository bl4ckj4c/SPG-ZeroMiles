TEMPLATE FOR RETROSPECTIVE (Team P01)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 5 vs 5
- Total points committed vs done: 42 vs 42
- Nr of hours planned vs spent (as a team): 117h vs 115h 30m

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 58      | -      | 82h 30m    | 82h 55m      |
| 13    | 2       | 8      | 3h 30m     | 3h           |
| 17    | 4       | 13     | 11h 30m    | 11h 20m      |
| 40    | 3       | 3      | 2h 30m     | 2h 30m       |
| 41    | 6       | 13     | 14h        | 13h          |
| 42    | 2       | 5      | 3h         | 2h 45m       |



- Hours per task (average, standard deviation):
  - Average: 1h 33m
  - Standard deviation: 1h 22m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table
  - 117h / 115h 30m = 1.013 -> 101.3%
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 39h 15m
  - Total hours spent: 40h 20m
  - Nr of automated unit test cases: 64 (backend) + 80 (frontend) = 144
  - Coverage (if available): 67.3%
  
- E2E testing:
  - Total hours estimated for automatic testing: 0h
  - Total hours spent for automatic testing: 0h
  - *We tested components E2E manually, in order to verify that they were working, but we did not automate this kind of testing. So this time is included in time for developing single components.*
  
- Code review 
  - Total hours estimated: 0h
  - Total hours spent: 0h
  - *We did code review on single components , in order to verify that they were working, but we did not create a proper task. So this time is included in time for developing single components.*
  
- Technical Debt management:
  - Total hours estimated: 11h 45m
  
  - Total hours spent: 13h
  
  - Hours estimated for remediation by SonarQube: 5m
  
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 5m
  
  - Hours spent on remediation: 1h
  
  - Debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0%
  
  - Rating for each quality characteristic reported in SonarQube under "Measures"
  
    | Measures        | Rating |
    | --------------- | ------ |
    | Reliability     | A      |
    | Security        | A      |
    | Security Review | A      |
    | Maintainability | A      |
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

> We have two kind of errors in estimation: some tasks were underestimated and other were overestimated. Talking about the former we estimated less hours than the actual ones for some frontend unit tests, because they were not trivial, so we needed to understand them better. Talking about the latter, we overestimated other frontend and backend unit tests that were easier than expected.

- What lessons did you learn (both positive and negative) in this sprint?

> We should have done a better E2E testing, in order to stress the system, so errors would have been found before the demo. We learned that just a very tiny mistake can ruin an entire demo if not found.

- Which improvement goals set in the previous retrospective were you able to achieve? 

> *Second goal is to improve some documentation in order to  better understand what our project is doing and which APIs are exposed  and so on and so forth.*
>
> We improved the documentation of the APIs, adding also user login information and some screenshot of the webpage (laptop and mobile view).
>
> *Third goal is to create a multistage Docker in order to strip down the image size.*
>
> We achieved also this goal, so now the docker is built using multistage and so its size is stripped down to 146.51 MB (previously it was 196.42 MB).

- Which ones you were not able to achieve? Why?

> *The main goal is to achieve the 80% of test, both frontend and backend in order to get all measure with A score in SonarCloud.*
>
> We did not achieve 80% of global coverage, but we did our best putting a lot of effort in this goal. We reached a coverage of 69.4% on the backend and 66.0% on the frontend, with a total of 67.3%.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> This is last sprint, but if there was another one, we would have improved for sure the testing in order to reach an higher coverage and automate the E2E testing in order to find more bugs and so ensure that everything is working correctly without unexpected behavior (so the demo will work too).

- One thing you are proud of as a Team!!

> Even tough we came across with a problem, we were quick and collaborative in solving it.
