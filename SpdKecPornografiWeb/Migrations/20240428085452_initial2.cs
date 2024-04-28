using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpdKecPornografiWeb.Migrations
{
    public partial class initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Suggestion",
                table: "Diagnosis",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "Text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Diagnosis",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "Text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "1134636b-08cd-4306-85d9-3f9176befa77",
                column: "CreatedAt",
                value: new DateTime(2024, 4, 28, 15, 54, 52, 105, DateTimeKind.Local).AddTicks(6662));

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "d941614b-4e34-42cc-bf68-f2f599c3cf85",
                column: "CreatedAt",
                value: new DateTime(2024, 4, 28, 15, 54, 52, 105, DateTimeKind.Local).AddTicks(6655));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Suggestion",
                table: "Diagnosis",
                type: "Text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Diagnosis",
                type: "Text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "1134636b-08cd-4306-85d9-3f9176befa77",
                column: "CreatedAt",
                value: new DateTime(2024, 4, 5, 10, 32, 49, 54, DateTimeKind.Local).AddTicks(364));

            migrationBuilder.UpdateData(
                table: "Account",
                keyColumn: "Id",
                keyValue: "d941614b-4e34-42cc-bf68-f2f599c3cf85",
                column: "CreatedAt",
                value: new DateTime(2024, 4, 5, 10, 32, 49, 54, DateTimeKind.Local).AddTicks(357));
        }
    }
}
