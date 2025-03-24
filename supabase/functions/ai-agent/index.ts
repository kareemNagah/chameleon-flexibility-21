
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { ChatOpenAI } from 'https://esm.sh/langchain/chat_models/openai'
import { PromptTemplate } from 'https://esm.sh/langchain/prompts'
import { StringOutputParser } from 'https://esm.sh/langchain/schema/output_parser'
import { RunnableSequence } from 'https://esm.sh/langchain/schema/runnable'

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

    // Initialize the LLM
    const llm = new ChatOpenAI({
      openAIApiKey,
      temperature: 0.7,
      modelName: 'gpt-4o-mini', // Using GPT-4o-mini for optimal performance/cost
      maxConcurrency: 5,
    })

    console.log('Received prompt:', prompt)
    console.log('User preferences:', userPreferences)
    console.log('Goal:', goal)

    // Create a prompt template for productivity planning
    const promptTemplate = PromptTemplate.fromTemplate(`
      You are FLEX, an AI productivity assistant that helps users create personalized plans.
      
      User preferences: {preferences}
      User's primary goal: {goal}
      
      User request: {query}
      
      Respond with a detailed and personalized productivity plan that includes:
      1. A daily schedule with specific time blocks
      2. Weekly focus areas that align with their goal
      3. Recommended habits to build
      4. Actionable next steps
      
      Make your response friendly, motivational, and tailored to their specific needs.
    `)

    // Create a runnable sequence
    const chain = RunnableSequence.from([
      {
        query: (input) => input.prompt,
        preferences: (input) => input.userPreferences,
        goal: (input) => input.goal,
      },
      promptTemplate,
      llm,
      new StringOutputParser(),
    ])

    // Execute the chain
    const response = await chain.invoke({
      prompt,
      userPreferences: JSON.stringify(userPreferences),
      goal,
    })

    // Return the AI response
    return new Response(
      JSON.stringify({
        success: true,
        message: response,
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
