using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpdKecPornografiWeb.Models;

[Table("Answer_Diagnosis")]
public class AnswerDiagnosis
{
    [Key] public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? AnswerId { get; set; }
    public virtual Answer? Answer { get; set; }
    public string? DiagnosisId { get; set; }
    public virtual Diagnosis? Diagnosis { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.Now;
    public string? CreatedById { get; set; }
    [ForeignKey("CreatedById")] public virtual Account? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    public string? UpdatedById { get; set; }
    [ForeignKey("UpdatedById")] public virtual Account? UpdatedBy { get; set; }
}