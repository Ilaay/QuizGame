using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
	public class Question
	{
		[Key]
		public int QuestionId { get; set; }

		[Column(TypeName = "nvarchar(250)")]
		public string QuestionText { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string? QuestionImage { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Option1 { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Option2 { get; set; }
		public int QuestionAnswer { get; set; }
	}
}
