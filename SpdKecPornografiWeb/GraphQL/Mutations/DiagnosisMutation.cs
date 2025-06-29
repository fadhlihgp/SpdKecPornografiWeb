using HotChocolate.AspNetCore.Authorization;
using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
[Authorize]
public class DiagnosisMutation
{

    private readonly IDiagnosisService _diagnosisService;

    public DiagnosisMutation(IDiagnosisService diagnosisService)
    {
        _diagnosisService = diagnosisService;
    }

    public async Task<Diagnosis> AddDiagnosisAsync([Service] IHttpContextAccessor httpContextAccessor, [Service] AppDbContext dbContext, DiagnosisRequestDto requestDto)
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirst("AccountId")?.Value;
        
        var diagnosis = new Diagnosis
        {
            Name = requestDto.DiagnosisName,
            Description = requestDto.DiagnosisDescription,
            Suggestion = requestDto.DiagnosisSuggestion,
            Code = requestDto.DiagnosisCode,
            CreatedAt = DateTime.Now,
            CreatedById = userId,
            UpdatedAt = DateTime.Now,
            UpdatedById = userId,
        };
        dbContext.Diagnoses.Add(diagnosis);
        await dbContext.SaveChangesAsync();
        return diagnosis;
    }

    public async Task UpdateDiagnosisAsync([Service] IHttpContextAccessor httpContextAccessor, string diagnosisId, DiagnosisRequestDto requestDto)
    {
        var userId = GetUserIdFromContext(httpContextAccessor);
        await _diagnosisService.UpdateDiagnosisAsync(userId, diagnosisId, requestDto);
    }
    
    public async Task DeleteDiagnosisAsync([Service] IHttpContextAccessor httpContextAccessor, string diagnosisId)
    {
        var userId = GetUserIdFromContext(httpContextAccessor);
        await _diagnosisService.DeleteDiagnosis(userId, diagnosisId);
    }

    private string GetUserIdFromContext(IHttpContextAccessor httpContextAccessor)
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirst("AccountId")?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        return userId;
    }
}