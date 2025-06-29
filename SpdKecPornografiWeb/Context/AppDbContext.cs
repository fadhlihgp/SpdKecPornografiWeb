using Microsoft.EntityFrameworkCore;
using SpdKecPornografiWeb.Models;

namespace SpdKecPornografiWeb.Context;

public class AppDbContext : DbContext
{
    public virtual DbSet<Account> Accounts => Set<Account>();
    public virtual DbSet<Answer> Answers => Set<Answer>();
    public virtual DbSet<Diagnosis> Diagnoses => Set<Diagnosis>();
    public virtual DbSet<AnswerDiagnosis> AnswerDiagnoses => Set<AnswerDiagnosis>();
    public virtual DbSet<Question> Questions => Set<Question>();
    public virtual DbSet<ResultHistory> ResultHistories => Set<ResultHistory>();
    public virtual DbSet<Role> Roles => Set<Role>();
    public virtual DbSet<Otp> Otps => Set<Otp>();

    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(builder =>
        {
            builder.HasIndex(a => a.PhoneNumber).IsUnique();
            builder.HasIndex(a => a.Email).IsUnique();
            builder.HasIndex(a => a.Username).IsUnique();
        });

        modelBuilder.Entity<Question>(modelBuilder =>
        {
            modelBuilder.HasIndex(q => q.QuestionCode).IsUnique();
        });

        modelBuilder.Entity<Answer>(modelBuilder =>
        {
            modelBuilder.HasIndex(a => a.AnswerCode).IsUnique();
        });

        modelBuilder.Entity<ResultHistory>(modelBuilder =>
        {
            modelBuilder.HasIndex(rh => rh.TestCode).IsUnique();
        });
            
        modelBuilder.Entity<Role>(modelBuilder =>
        {
            modelBuilder.HasData(
                new Role { Id = "1", Name = "SuperAdmin" },
                new Role { Id = "2", Name = "Admin" },
                new Role { Id = "3", Name = "User" });
        });

        modelBuilder.Entity<Account>(modelBuilder =>
        {
            modelBuilder.HasData(
                new Account
                {
                    Id = "d941614b-4e34-42cc-bf68-f2f599c3cf85",
                    Fullname = "Super Admin",
                    Username = "superadmin",
                    Password = "$2a$12$zDIeyHL0Im6Mhet4TkAYb.CIFZfNCLFa2c4pg707FoJkGBLCGEuCi",
                    Email = "superadmin@email.com",
                    PhoneNumber = "081234567",
                    // ImageUrl = null,
                    RoleId = "1",
                    // Role = null,
                    CreatedAt = DateTime.Now,
                    // LastLogin = null,
                    IsActive = true,
                    IsBlocked = false
                },
                new Account
                {
                    Id = "1134636b-08cd-4306-85d9-3f9176befa77",
                    Fullname = "Admin",
                    Username = "admin",
                    Password = "$2a$12$zDIeyHL0Im6Mhet4TkAYb.CIFZfNCLFa2c4pg707FoJkGBLCGEuCi",
                    Email = "admin@email.com",
                    PhoneNumber = "08123456227",
                    // ImageUrl = null,
                    RoleId = "2",
                    // Role = null,
                    CreatedAt = DateTime.Now,
                    // LastLogin = null,
                    IsActive = true,
                    IsBlocked = false
                });
        });
    }
}