---
title: 【dotnet】EF Core 
date: 2018-11-7
tags: 
  - dotnet
  - ef
author: iewihc
location: tw  
---

# EF-Core 安裝

# 1.Tools
```sh
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 5.0.6
```

# 2.選擇資料庫

### SqlServer

```sh
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 5.0.6
```
### MySQL

```sh
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 5.0.0
```

# 3.Design

```sh
dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0.6
```

---

# Scaffold

```sh
dotnet ef dbcontext scaffold "Server=.\SQLEXPRESS;Database=SchoolDB;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models 
```

```c#
  var test = new PromotionTop();
                test.Id = "1";
                test.Name = "3030";
                var test2 = new PromotionTop();
                test2.InjectFrom(new LoopInjection(new[] {"Name"}), test);
                var test2Id = test2.Id;
                var test2name = test2.Name;
```

---

# Github Sample
[EF-Core-First-Sample](https://github.com/iewihc/EF-Code-First-Sample)

```sh
dotnet ef migrations add InitialCreate // 創建遷移指令
dotnet ef database update // 利用上面所創的遷移更新
```


# 一對一關係

e.g. 一張書桌對應一個學生

## C# Class Should Be

```csharp
public class Desk
{
　　public int Id { get; set; }
　　public string Name { get; set; }
　　
　　public Student Student { get; set; }
}

public class Student
{
　　public int Id { get; set; }
　　public string Name { get; set; }
　　public int DeskID { get; set; }
　　
　　public Desk Desk { get; set; }
}
```

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
     modelBuilder.Entity<Student>()
                .HasOne(a => a.Desk)
                .WithOne(b => b.Student)
                .HasForeignKey<Desk>(b => b.Id);
}
```

## SQL Server Should Be

### Desk
|Id|Name|
|---|---|
|1001|WeiDesk|
|2002|LeeDesk|

### Desk 而言
(PK) : `ID`

### Student
|Id|Name|DeskID(FK)|
|---|---|---|
|1|Wei|1001|
|2|Lee|2002|



### Student 而言
(PK) : `ID`

(FK) : `DeskID`
```sql
alter table Student
	add constraint FK_Students_Desk_DeskID
		foreign key (DeskID) references Desk
```

---

# 一對多關係

e.g. 一間學校有多個老師

## C# Class Should Be

```csharp
public class School
{
　　public int Id { get; set; }
　　public string Name { get; set; }
　　
   public ICollection<Teacher> Teachers { get; set; }
}

public class Teacher
{
　　public int Id { get; set; }
　　public string Name { get; set; }
　　public int SchooldId { get; set; }
　　public School School { get; set; }
}
```

```csharp

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
      modelBuilder.Entity<School>()
                .HasMany(c => c.Teachers)
                .WithOne(e => e.School);
}

```

## SQL Server Should Be

### Teacher(多方)
|Id|Name|SchoolId(FK)|
|---|---|---|
|1|林老師|A01|
|2|王老師|B01|

### Teacher而言

(PK) : `ID`

(FK): `SchoolID`
```sql
alter table Teacher
	add constraint FK_Teacher_School_SchoolId
		foreign key (SchoolId) references School (Id)
```


### School(一方)
|Id|Name|
|---|---|
|A01|常春藤大學|
|B01|台北大學|

---

# 多對多關係

班級和老師的關係 (老師可以去多個班級任教)
實現: 需使用獨立一張表實現

## C# Classm Should Be

```csharp
public class Teacher
{
        public int TeacherId { get; set; }
        public string Name { get; set; }
        public IEnumerable<TeacherClassRoom> ClassRooms { get; set; }
}

```

```csharp
    public class ClassRoom
    {
        public int ClassRoomId { get; set; }
        public string CategoryName { get; set; }
        public IEnumerable<TeacherClassRoom> Teachers { get; set; }
    }
```

```csharp
    public class TeacherClassRoom
    {
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public int ClassRoomId { get; set; }
        public ClassRoom ClassRoom { get; set; }
    }
```

```csharp
  protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            modelBuilder.Entity<TeacherClassRoom>()
                .HasKey(bc => new { bc.TeacherId, bc.ClassRoomId });  
            modelBuilder.Entity<TeacherClassRoom>()
                .HasOne(bc => bc.Teacher)
                .WithMany(b => b.ClassRooms)
                .HasForeignKey(bc => bc.TeacherId);  
            modelBuilder.Entity<TeacherClassRoom>()
                .HasOne(bc => bc.ClassRoom)
                .WithMany(c => c.Teachers)
                .HasForeignKey(bc => bc.ClassRoomId);

        }
```



## SQL Server Should Be

### Teacher (教師表)
|Id|Name|
|---|---|
|1|林老師|
|2|王老師|


### ClassRoom (班級表)
|Id|Name|
|---|---|
|C01|三年一班|
|C02|三年二班|

### ClassRoomTeacher (班級教師表)

|TeacherId(PK)|ClassRoomId(PK)|
|---|---|
|1|C01|
|2|C02|


### ClassRoomTeacher而言

```SQL
create table TeacherClassRoom
(
    TeacherId   int not null
        constraint FK_TeacherClassRoom_Teacher_TeacherId
            references Teacher
            on delete cascade,
    ClassRoomId int not null
        constraint FK_TeacherClassRoom_ClassRoom_ClassRoomId
            references ClassRoom
            on delete cascade,
    constraint PK_TeacherClassRoom
        primary key (TeacherId, ClassRoomId)
)
go

create index IX_TeacherClassRoom_ClassRoomId
    on TeacherClassRoom (ClassRoomId)
go

```

