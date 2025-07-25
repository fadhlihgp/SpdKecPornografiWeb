﻿using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Helpers;
using SpdKecPornografiWeb.Services.Interfaces;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("uploadPhoto")]
public class UploadPhotoController : ControllerBase
{
    private readonly IPhotoService _photoService;

    public UploadPhotoController(IPhotoService photoService)
    {
        _photoService = photoService;
    }

    [HttpPost]
    public async Task<IActionResult> UploadPhoto(IFormFile imageUrl)
    {
        var uploadPhoto = await _photoService.AddPhotoAsync(imageUrl);
        return Created("uploadPhoto", new
        {
            message = "Berhasil mengunggah foto",
            data = new
            {
                url = uploadPhoto.Url.ToString(),
                publicId = uploadPhoto.PublicId.ToString()
            }
        });
    }

    [HttpDelete("{imageUrl}")]
    public async Task<IActionResult> DeletePhoto([FromRoute] string imageUrl)
    {
        await _photoService.DeletePhotoAsync(imageUrl);
        return Ok(new
        {
            message = "Berhasil menghapus foto"
        });
    }

    [HttpGet]
    public Task<IActionResult> GetPublicUrl([FromForm] string imageUrl)
    {
        return Task.FromResult<IActionResult>(Ok(new
        {
            publicId = RandomCode.ConvertUrlToPublicId(imageUrl)
        }));
    }
}