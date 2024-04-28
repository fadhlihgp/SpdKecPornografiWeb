using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpdKecPornografiWeb.Models;

[Table("Diagnosis")]
public class Diagnosis
{
    [Key] public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    [Column(TypeName = "nvarchar(max)")] public string? Description { get; set; }
    [Column(TypeName = "nvarchar(max)")] public string? Suggestion { get; set; }
    public string Code { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime? CreatedAt { get; set; } = DateTime.Now;
    public string? CreatedById { get; set; }
    [ForeignKey("CreatedById")] public virtual Account? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    public string? UpdatedById { get; set; }
    [ForeignKey("UpdatedById")] public virtual Account? UpdatedBy { get; set; }
}