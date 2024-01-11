using System.ComponentModel.DataAnnotations;

namespace SpdKecPornografiWeb.ViewModels;

public class SendOtpDto
{
    [EmailAddress] public string Email { get; set; }
}

public class ResetPasswordOtpDto
{
    [EmailAddress] public string Email { get; set; }
    public string OtpCode { get; set; }
}