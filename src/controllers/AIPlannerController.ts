
import { AIGeneratedPlan, UserPreferences, ScheduleItem } from "../models/AIPlanner";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

export class AIPlannerController {
  // Generate AI plan using Supabase Edge Function
  static async generatePlan(preferences: UserPreferences): Promise<AIGeneratedPlan> {
    try {
      // Get user info
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: {
          prompt: "Create a personalized productivity plan for me based on my preferences",
          userPreferences: preferences,
          goal: preferences.primaryGoal
        }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to generate plan: ${error.message}`);
      }
      
      if (!data || !data.success) {
        throw new Error('Failed to generate plan');
      }
      
      // Parse the AI response to extract structured data
      return this.parseAIResponse(data.message, preferences);
    } catch (error) {
      console.error('Failed to generate AI plan:', error);
      toast({
        title: "Error generating plan",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      
      // Fallback to mock data if the AI service fails
      return this.generateFallbackPlan(preferences);
    }
  }

  // Parse the AI response into structured data
  private static parseAIResponse(aiResponse: string, preferences: UserPreferences): AIGeneratedPlan {
    try {
      // In a real implementation, you would parse the AI text response
      // into structured data. Here, we're using a simplified approach.
      
      // Create a mock daily schedule based on preferences
      const dailySchedule: ScheduleItem[] = [
        {
          id: "1",
          time: preferences.wakeUpTime,
          activity: "Morning Routine & Breakfast",
          duration: 30,
          priority: "medium"
        },
        {
          id: "2",
          time: this.addMinutesToTime(preferences.wakeUpTime, 30),
          activity: `Focus Session: ${preferences.primaryGoal}`,
          duration: 90,
          priority: "high"
        },
        {
          id: "3",
          time: this.addMinutesToTime(preferences.wakeUpTime, 120),
          activity: "Short Break",
          duration: preferences.breakDuration,
          priority: "low"
        },
        // Add more activities
      ];

      // Extract weekly focus areas from the AI response
      const weeklyFocusMatch = aiResponse.match(/Weekly focus areas[:\s]+([\s\S]+?)(?=\d+\.|$)/i);
      const weeklyFocus = weeklyFocusMatch 
        ? weeklyFocusMatch[1].split(/\n+/).filter(item => item.trim().length > 0 && item.includes('-'))
            .map(item => item.replace(/^[-*•]+\s*/, '').trim())
            .slice(0, 3)
        : ["Complete project milestones", "Learn new skills", "Balance work with self-care"];

      // Extract suggested habits from the AI response
      const habitsMatch = aiResponse.match(/Recommended habits[:\s]+([\s\S]+?)(?=\d+\.|$)/i);
      const suggestedHabits = habitsMatch
        ? habitsMatch[1].split(/\n+/).filter(item => item.trim().length > 0 && item.includes('-'))
            .map(item => item.replace(/^[-*•]+\s*/, '').trim())
            .slice(0, 3)
        : ["Daily coding practice", "10-minute meditation", "Regular stretching breaks"];

      return {
        dailySchedule,
        weeklyFocus,
        suggestedHabits
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.generateFallbackPlan(preferences);
    }
  }

  // Fallback method to generate a plan if the AI service fails
  private static generateFallbackPlan(preferences: UserPreferences): AIGeneratedPlan {
    console.log("Using fallback plan generator");
    
    const dailySchedule: ScheduleItem[] = [
      {
        id: "1",
        time: preferences.wakeUpTime,
        activity: "Morning Routine & Breakfast",
        duration: 30,
        priority: "medium"
      },
      {
        id: "2",
        time: this.addMinutesToTime(preferences.wakeUpTime, 30),
        activity: `Focus Session: ${preferences.primaryGoal}`,
        duration: 90,
        priority: "high"
      },
      {
        id: "3",
        time: this.addMinutesToTime(preferences.wakeUpTime, 120),
        activity: "Short Break",
        duration: preferences.breakDuration,
        priority: "low"
      },
      // Add more activities based on user preferences
    ];

    return {
      dailySchedule,
      weeklyFocus: [
        "Complete project milestones",
        "Learn new development skills",
        "Balance work with self-care"
      ],
      suggestedHabits: [
        "Daily coding practice",
        "10-minute meditation",
        "Regular stretching breaks"
      ]
    };
  }

  static getSamplePreferences(): UserPreferences {
    return {
      wakeUpTime: "07:00",
      sleepTime: "23:00",
      focusPeriods: 4,
      breakDuration: 15,
      primaryGoal: "Complete React Project"
    };
  }

  // Helper function to add minutes to a time string
  private static addMinutesToTime(time: string, minutesToAdd: number): string {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
  }
}
