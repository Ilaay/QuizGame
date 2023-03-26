using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
	[Route("api/[controller]")]	
	[ApiController]
	public class QuestionController : ControllerBase
	{
		private readonly QuizDbContext _context;

		public QuestionController(QuizDbContext context)
		{
			_context = context;
		}

		// GET: api/Question
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
		{
			var quizQuestion = await (_context.Questions
				 .Select(x => new
				 {
					 x.QuestionId,
					 x.QuestionText,
					 x.QuestionImage,
					 Options = new string[] { x.Option1, x.Option2 }
				 })
				 ).ToListAsync();

			return Ok(quizQuestion);
		}

		// GET: api/Question/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Question>> GetQuestion(int id)
		{
			var question = await _context.Questions.FindAsync(id);

			if (question == null)
			{
				return NotFound();
			}

			return question;
		}

		// PUT: api/Question/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutQuestion(int id, Question question)
		{
			if (id != question.QuestionId)
			{
				return BadRequest();
			}

			_context.Entry(question).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!QuestionExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Question/GetAnswers
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		[Route("GetAnswers")]
		public async Task<ActionResult<Question>> RetrieveAnswers()
		{
			var answers = await (_context.Questions
				.Select(y => new
				{
					y.QuestionId,
					y.QuestionText,
					y.QuestionImage,
					Options = new string[] { y.Option1, y.Option2},
					y.QuestionAnswer
				})).ToListAsync();
			return Ok(answers);
		}

		// DELETE: api/Question/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteQuestion(int id)
		{
			var question = await _context.Questions.FindAsync(id);
			if (question == null)
			{
				return NotFound();
			}

			_context.Questions.Remove(question);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool QuestionExists(int id)
		{
			return _context.Questions.Any(e => e.QuestionId == id);
		}
	}
}
