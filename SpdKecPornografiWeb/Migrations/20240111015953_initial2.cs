using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpdKecPornografiWeb.Migrations
{
    public partial class initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "Account",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Otps",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    OtpCode = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ExpiredAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Otps", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "1134636b-08cd-4306-85d9-3f9176befa77",
                column: "CreatedAt",
                value: new DateTime(2024, 1, 11, 8, 59, 52, 915, DateTimeKind.Local).AddTicks(2084));

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "d941614b-4e34-42cc-bf68-f2f599c3cf85",
                column: "CreatedAt",
                value: new DateTime(2024, 1, 11, 8, 59, 52, 915, DateTimeKind.Local).AddTicks(2073));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Otps");

            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "Account");

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "1134636b-08cd-4306-85d9-3f9176befa77",
                column: "CreatedAt",
                value: new DateTime(2024, 1, 3, 8, 21, 40, 470, DateTimeKind.Local).AddTicks(2119));

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "d941614b-4e34-42cc-bf68-f2f599c3cf85",
                column: "CreatedAt",
                value: new DateTime(2024, 1, 3, 8, 21, 40, 470, DateTimeKind.Local).AddTicks(2115));
        }
    }
}
