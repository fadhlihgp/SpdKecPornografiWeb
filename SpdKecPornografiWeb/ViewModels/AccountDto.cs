namespace SpdKecPornografiWeb.ViewModels;

public class AccountDto
{
    public string Id { get; set; }
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string? ImageUrl { get; set; }
    public string? Role { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime?  LastLogin { get; set; }
}