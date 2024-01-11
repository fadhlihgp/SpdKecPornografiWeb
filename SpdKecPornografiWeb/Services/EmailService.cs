using MailKit.Net.Smtp;
using MimeKit;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;
    
    private string _smtpServer;
    private int _smtpPort;
    private string _smtpUsername;
    private string _smtpPassword;
    
    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _smtpServer = _configuration["EmailSettings:SMTPServer"];
        _smtpPort = Convert.ToInt32(_configuration["EmailSettings:SMTPPort"]);
        _smtpUsername = _configuration["EmailSettings:SMTPUsername"];
        _smtpPassword = _configuration["EmailSettings:SMTPPassword"];
    }

    public async Task<bool> SendEmailAsync(SendEmailDto sendEmailDto)
    {
        try
        {
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_smtpUsername));
            message.To.Add(MailboxAddress.Parse(sendEmailDto.To));
            message.Subject = sendEmailDto.Subject;

            var builder = new BodyBuilder();
            builder.HtmlBody = sendEmailDto.Body;
            message.Body = builder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, true);
            await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
                
            return true; // Email sent successfully
        }
        catch (Exception e)
        {
            // Console.WriteLine(e);
            _logger.LogError(e.Message);
            throw;
        }
    }
}