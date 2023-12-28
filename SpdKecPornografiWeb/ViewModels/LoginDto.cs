﻿namespace SpdKecPornografiWeb.ViewModels;

public class LoginRequestDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginResponseDto
{
    public string Username { get; set; }
    public string Role { get; set; }
    public string Token { get; set; }
}