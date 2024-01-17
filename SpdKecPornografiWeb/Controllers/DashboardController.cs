using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public IActionResult GetDashboard()
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        var dashboard = _dashboardService.GetDashboard(accountId);
        return Ok(new
        {
            message = "Berhasil mendapatkan data dashboard",
            data = dashboard
        });
    }
}