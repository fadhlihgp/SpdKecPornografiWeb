namespace SpdKecPornografiWeb.ViewModels;

public class RegisterRequestDto
{
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string PhoneNumber { get; set; }
    public string RoleId { get; set; }
    public string? ImageUrl { get; set; }
    public string? IsActive { get; set; }
    public string? IsBlocked { get; set; }
    public string? IsVerified { get; set; }
}

public class RegisterResponseDto
{
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
}