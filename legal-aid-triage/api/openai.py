# api/openai.py
import os
import json
import openai

def handler(event, context):
    """
    Vercel's Python serverless entry point is typically named `handler`.
    We'll parse the JSON from the request, call OpenAI, and return JSON.
    """
    try:
        # 1) Parse the intake data from the request body:
        body_str = event["body"]
        intake_data = json.loads(body_str)

        # 2) Use environment variable for the OpenAI API key
        openai.api_key = os.getenv("OPENAI_API_KEY")

        # 3) Create a prompt from the user's intake data
        problem_description = intake_data.get("problemDescription", "")
        first_name = intake_data.get("firstName", "")
        last_name = intake_data.get("lastName", "")

        # 4) Example: use GPT to generate a summary or next steps
        prompt_text = f"""
        The client's name is {first_name} {last_name}.
        They described their legal issue as follows: '{problem_description}'.
        Please provide a concise summary and potential next steps:
        """

        # 5) Call OpenAI's ChatCompletion (or Completion) endpoint
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful legal assistant."},
                {"role": "user", "content": prompt_text},
            ],
            temperature=0.7
        )

        ai_message = response["choices"][0]["message"]["content"]

        # 6) Return some structured data to the front end
        result = {
            "caseSummary": ai_message.strip(),
            # You could also generate tasks, deadlines, etc. from the GPT response
            # or do additional parsing.
        }

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(result)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
