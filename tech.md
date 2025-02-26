# Tech details for reference

## DB Models (pseudo)

- User

  - id String(uuid)
  - name String
  - age Number
  - profession ["student", "teacher", "researcher"]

- Quiz

  - id String
  - questions Question
  - genereatedBy UserId

- Question
  - id
  - quizId
  - question
  - choices
  - correctChoice
