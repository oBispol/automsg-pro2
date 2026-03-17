export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const maxRetries = 3;
  const retryDelay = 2000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages: [{
              role: 'user',
              content: prompt
            }],
            temperature: 0.3,
            max_tokens: 2048
          })
        }
      );

      if (response.status === 429) {
        if (attempt < maxRetries - 1) {
          await new Promise(r => setTimeout(r, retryDelay * (attempt + 1)));
          continue;
        }
        return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
      }

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error?.message || 'API error' });
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';

      return res.status(200).json({ text });
    } catch (error) {
      console.error('AI API Error:', error);
      if (attempt === maxRetries - 1) {
        return res.status(500).json({ error: 'Failed to call AI API' });
      }
    }
  }
}
