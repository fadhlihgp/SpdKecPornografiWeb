using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpdKecPornografiWeb.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Fullname = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    RoleId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastLogin = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsBlocked = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Account_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Diagnosis",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "Text", nullable: true),
                    Suggestion = table.Column<string>(type: "Text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UpdatedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnosis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Diagnosis_Account_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Diagnosis_Account_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    QuestionCode = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UpdatedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Question_Account_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Question_Account_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ResultHistory",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    TestCode = table.Column<string>(type: "text", nullable: false),
                    DiagnosisId = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AccountId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResultHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResultHistory_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResultHistory_Diagnosis_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    AnswerCode = table.Column<string>(type: "text", nullable: false),
                    QuestionId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UpdatedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answer_Account_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Answer_Account_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Answer_Question_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Question",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Answer_Diagnosis",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AnswerId = table.Column<string>(type: "text", nullable: true),
                    DiagnosisId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer_Diagnosis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answer_Diagnosis_Account_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Account",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Answer_Diagnosis_Answer_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answer",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Answer_Diagnosis_Diagnosis_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosis",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { "1", "SuperAdmin" },
                    { "2", "Admin" },
                    { "3", "User" }
                });

            migrationBuilder.InsertData(
                table: "Account",
                columns: new[] { "Id", "CreatedAt", "Email", "Fullname", "ImageUrl", "IsActive", "IsBlocked", "LastLogin", "Password", "PhoneNumber", "RoleId", "Username" },
                values: new object[,]
                {
                    { "1134636b-08cd-4306-85d9-3f9176befa77", new DateTime(2023, 12, 30, 9, 15, 16, 443, DateTimeKind.Local).AddTicks(8107), "admin@email.com", "Admin", null, true, false, null, "$2a$12$zDIeyHL0Im6Mhet4TkAYb.CIFZfNCLFa2c4pg707FoJkGBLCGEuCi", "08123456227", "2", "admin" },
                    { "d941614b-4e34-42cc-bf68-f2f599c3cf85", new DateTime(2023, 12, 30, 9, 15, 16, 443, DateTimeKind.Local).AddTicks(8104), "superadmin@email.com", "Super Admin", null, true, false, null, "$2a$12$zDIeyHL0Im6Mhet4TkAYb.CIFZfNCLFa2c4pg707FoJkGBLCGEuCi", "081234567", "1", "superadmin" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_Email",
                table: "Account",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Account_PhoneNumber",
                table: "Account",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Account_RoleId",
                table: "Account",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Account_Username",
                table: "Account",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_AnswerCode",
                table: "Answer",
                column: "AnswerCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_CreatedById",
                table: "Answer",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionId",
                table: "Answer",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_UpdatedById",
                table: "Answer",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_Diagnosis_AnswerId",
                table: "Answer_Diagnosis",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_Diagnosis_CreatedById",
                table: "Answer_Diagnosis",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_Diagnosis_DiagnosisId",
                table: "Answer_Diagnosis",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_Diagnosis_CreatedById",
                table: "Diagnosis",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Diagnosis_UpdatedById",
                table: "Diagnosis",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Question_CreatedById",
                table: "Question",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Question_QuestionCode",
                table: "Question",
                column: "QuestionCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Question_UpdatedById",
                table: "Question",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ResultHistory_AccountId",
                table: "ResultHistory",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultHistory_DiagnosisId",
                table: "ResultHistory",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultHistory_TestCode",
                table: "ResultHistory",
                column: "TestCode",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer_Diagnosis");

            migrationBuilder.DropTable(
                name: "ResultHistory");

            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "Diagnosis");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
