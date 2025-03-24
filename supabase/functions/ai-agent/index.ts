
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const requestData = await req.json()
    const { prompt, userPreferences, goal } = requestData

    if (!prompt) {
      throw new Error('No prompt provided')
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found')
    }

    console.log('Received prompt:', prompt)
    console.log('User preferences:', userPreferences)
    console.log('Goal:', goal)

    // Call the OpenAI API directly instead of using LangChain
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are FLEX, an AI productivity assistant that helps users create personalized plans.
            
            Make your response friendly, motivational, and tailored to the user's specific needs.
            `
          },
          {
            role: 'user',
            content: `
            User preferences: ${JSON.stringify(userPreferences)}
            User's primary goal: ${goal}
            
            User request: ${prompt}
            
            Please create a detailed and personalized productivity plan that includes:
            1. A daily schedule with specific time blocks
            2. Weekly focus areas that align with their goal
            3. Recommended habits to build
            4. Actionable next steps
            `
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Return the AI response
    return new Response(
      JSON.stringify({
        success: true,
        message: aiResponse,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
