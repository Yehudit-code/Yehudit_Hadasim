--CREATE DATABASE Yehudit_Hadasim

-- ======================================
-- יצירת טבלת אנשים (PEOPLE)
-- ======================================
CREATE TABLE People (
    Person_Id INT PRIMARY KEY IDENTITY(100,1),
    Personal_Name NVARCHAR(20),
    Family_Name NVARCHAR(20),
    Gender NVARCHAR(10),
    Father_Id INT NULL,
    Mother_Id INT NULL,
    Spouse_Id INT NULL
)

-- ======================================
-- טבלת קשרי משפחה (Family_Relations)
-- ======================================
CREATE TABLE Family_Relations (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type NVARCHAR(20),
    CONSTRAINT FK_Person FOREIGN KEY (Person_Id) REFERENCES People(Person_Id),
    CONSTRAINT FK_Relative FOREIGN KEY (Relative_Id) REFERENCES People(Person_Id),
    CONSTRAINT CK_Connection_Type CHECK (Connection_Type IN (
        N'אב', N'אם', N'אח', N'אחות', N'בן', N'בת', N'בן זוג', N'בת זוג'
    ))
)

-- ======================================
-- הכנסת נתוני דוגמה לטבלת Poeple
-- ======================================
INSERT INTO People (Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id) VALUES
( N'אמא', N'גולדפילד', N'נקבה', NULL, NULL, 101),
( N'אבא ', N'כהן', N'זכר', NULL, NULL, 100),
( N'יהודית', N'לוי', N'נקבה', 101, 100,NULL),
( N'בנימין', N'כהן', N'זכר', 101, 100,NULL),
( N'ישראל מאיר', N'רבבי', N'זכר',101, 100, NULL),
( N'נחמיה', N'כהן', N'זכר', 101, NULL, NULL);

-- ======================================
-- הוספת קשרים
-- ======================================
INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type) VALUES
(100, 101, N'בת זוג'),
(102, 100, N'אם'),
(104, 101, N'אב'),
(105, 101, N'אב'),
(103, 105, N'אח');

-- ======================================
-- השלמת קשרי בן זוג <--> בת זוג
-- ======================================

INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type)
SELECT
    fr.Relative_Id,
    fr.Person_Id,
    CASE 
        WHEN fr.Connection_Type = N'בן זוג' THEN N'בת זוג'
        WHEN fr.Connection_Type = N'בת זוג' THEN N'בן זוג'
    END
FROM Family_Relations fr
WHERE fr.Connection_Type IN (N'בן זוג', N'בת זוג')
AND NOT EXISTS (
    SELECT 1 FROM Family_Relations fr2
    WHERE fr2.Person_Id = fr.Relative_Id
    AND fr2.Relative_Id = fr.Person_Id
    AND (
        (fr2.Connection_Type = N'בן זוג' AND fr.Connection_Type = N'בת זוג') OR
        (fr2.Connection_Type = N'בת זוג' AND fr.Connection_Type = N'בן זוג')
    )
)

-- ======================================
-- השלמת קשרי הורה <--> ילד
-- ======================================

-- הורים <-- ילדים
INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type)
SELECT p.Father_Id, p.Person_Id,
       CASE WHEN p.Gender = N'זכר' THEN N'בן' ELSE N'בת' END
FROM People p
WHERE p.Father_Id IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM Family_Relations fr
    WHERE fr.Person_Id = p.Father_Id AND fr.Relative_Id = p.Person_Id
)

INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type)
SELECT p.Mother_Id, p.Person_Id,
       CASE WHEN p.Gender = N'זכר' THEN N'בן' ELSE N'בת' END
FROM People p
WHERE p.Mother_Id IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM Family_Relations fr
    WHERE fr.Person_Id = p.Mother_Id AND fr.Relative_Id = p.Person_Id
);

-- ילדים → הורים
INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type)
SELECT p.Person_Id, p.Father_Id, N'אב'
FROM People p
WHERE p.Father_Id IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM Family_Relations fr
    WHERE fr.Person_Id = p.Person_Id AND fr.Relative_Id = p.Father_Id
);

INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type)
SELECT p.Person_Id, p.Mother_Id, N'אם'
FROM People p
WHERE p.Mother_Id IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM Family_Relations fr
    WHERE fr.Person_Id = p.Person_Id AND fr.Relative_Id = p.Mother_Id
);

-- ======================================
-- השלמת קשרי אחים <--> אחיות
-- ======================================
INSERT INTO Family_Relations (Person_Id, Relative_Id, Connection_Type)
SELECT
    fr.Relative_Id,
    fr.Person_Id,
    CASE 
        WHEN p.Gender = N'זכר' THEN N'אח'
        WHEN p.Gender = N'נקבה' THEN N'אחות'
    END
FROM Family_Relations fr
JOIN People p ON fr.Person_Id = p.Person_Id
WHERE fr.Connection_Type IN (N'אח', N'אחות')
AND NOT EXISTS (
    SELECT 1 FROM Family_Relations fr2
    WHERE fr2.Person_Id = fr.Relative_Id
    AND fr2.Relative_Id = fr.Person_Id
    AND fr2.Connection_Type IN (N'אח', N'אחות')
)


SELECT * FROM Family_Relations ORDER BY Person_Id
