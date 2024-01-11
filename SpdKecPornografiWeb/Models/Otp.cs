namespace SpdKecPornografiWeb.Models;

public class Otp
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Email { get; set; }
    public string OtpCode { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime ExpiredAt { get; set; }
    public bool IsVerified { get; set; } = false;
}