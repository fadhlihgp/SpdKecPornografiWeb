using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpdKecPornografiWeb.Models;

[Table("Account")]
public class Account
{
    [Key] public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Fullname { get; set; }
    public string Username { get; set; }
    [Column(TypeName = "text")]
    public string Password { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string? ImageUrl { get; set; }
    public string? RoleId { get; set; }
    public virtual Role? Role { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.Now;
    public DateTime?  LastLogin { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsBlocked { get; set; } = false;
}