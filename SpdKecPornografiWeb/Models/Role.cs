using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpdKecPornografiWeb.Models;

[Table("Role")]
public class Role
{
    [Key] public string Id { get; set; } = new Guid().ToString();
    public string Name { get; set; }
}