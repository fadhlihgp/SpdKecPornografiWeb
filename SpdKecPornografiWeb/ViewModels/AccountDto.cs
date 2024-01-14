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
    public string? RoleId { get; set; }
    public bool? IsActive { get; set; }
    public bool? IsBlocked { get; set; }
    public bool? IsVerified { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime?  LastLogin { get; set; }
}

public class AccountResponseDto
{
    public string Id { get; set; }
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string? ImageUrl { get; set; }
    public string? Role { get; set; }
    public string? RoleId { get; set; }
    public string? IsActive { get; set; }
    public string? IsBlocked { get; set; }
    public string? IsVerified { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime?  LastLogin { get; set; }
}

public class UpdateAccountRequestDto
{
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}

public class ChangePasswordDto
{
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
}

public class ChangePasswordAdminDto
{
    public string NewPassword { get; set; }
}