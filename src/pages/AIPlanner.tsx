
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIPlannerController } from '../controllers/AIPlannerController';
import { UserPreferences, AIGeneratedPlan } from '../models/AIPlanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Navbar from '../components/Navbar';
import { Wand2, Clock, Edit, CheckCircle, Brain, Calendar, Lightbulb, Timer } from 'lucide-react';

const AIPlanner = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences>(
    AIPlannerController.getSamplePreferences()
  );
  const [generatedPlan, setGeneratedPlan] = useState<AIGeneratedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  const generatePlan = () => {
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const plan = AIPlannerController.generatePlan(preferences);
      setGeneratedPlan(plan);
      setIsGenerating(false);
      setIsEditing(false);
      
      toast({
        title: "Plan Generated!",
        description: "Your personalized schedule is ready to review.",
      });
    }, 1500);
  };

  const savePlan = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Plan Saved!",
      description: "Your personalized schedule has been saved to your dashboard.",
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <Navbar />
      <div className="container mx-auto py-28 px-4">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">AI Personalized Planner</h1>
            <p className="text-muted-foreground">
              Let our AI create a customized schedule based on your preferences
            </p>
          </div>

          {/* User Preferences Form */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-chameleon-green" />
                Your Preferences
              </CardTitle>
              <CardDescription>
                Tell us about your routine and goals to generate a personalized plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`space-y-4 ${!isEditing ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="wakeUpTime" className="block text-sm font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Wake Up Time
                    </label>
                    <Input
                      id="wakeUpTime"
                      name="wakeUpTime"
                      type="time"
                      value={preferences.wakeUpTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="sleepTime" className="block text-sm font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Sleep Time
                    </label>
                    <Input
                      id="sleepTime"
                      name="sleepTime"
                      type="time"
                      value={preferences.sleepTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="focusPeriods" className="block text-sm font-medium flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Focus Periods Per Day
                    </label>
                    <Input
                      id="focusPeriods"
                      name="focusPeriods"
                      type="number"
                      min="1"
                      max="10"
                      value={preferences.focusPeriods}
                      onChange={handleNumberChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="breakDuration" className="block text-sm font-medium flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      Break Duration (minutes)
                    </label>
                    <Input
                      id="breakDuration"
                      name="breakDuration"
                      type="number"
                      min="5"
                      max="60"
                      step="5"
                      value={preferences.breakDuration}
                      onChange={handleNumberChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="primaryGoal" className="block text-sm font-medium flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Primary Goal
                  </label>
                  <Input
                    id="primaryGoal"
                    name="primaryGoal"
                    value={preferences.primaryGoal}
                    onChange={handleInputChange}
                    placeholder="What's your main focus right now?"
                  />
                </div>
              </div>

              {!generatedPlan && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={generatePlan} 
                    disabled={isGenerating}
                    className="gap-2 bg-chameleon-gradient hover:opacity-90"
                    size="lg"
                  >
                    <Wand2 className="h-5 w-5" />
                    {isGenerating ? 'Generating...' : 'Generate Plan'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Plan */}
          {generatedPlan && (
            <div className="space-y-6 animate-fade-in">
              {/* Daily Schedule */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-chameleon-green" />
                    Your Personalized Daily Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedPlan.dailySchedule.map((item) => (
                      <div 
                        key={item.id}
                        className={`p-3 rounded-md border-l-4 flex items-center justify-between ${
                          item.priority === 'high' 
                            ? 'border-l-chameleon-orange bg-orange-50' 
                            : item.priority === 'medium'
                            ? 'border-l-chameleon-yellow bg-yellow-50'
                            : 'border-l-chameleon-green-light bg-green-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium min-w-20">{item.time}</div>
                          <div>
                            <div className="font-medium">{item.activity}</div>
                            <div className="text-xs text-muted-foreground">
                              Duration: {item.duration} minutes
                            </div>
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-white">
                          {item.priority} priority
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Focus & Suggested Habits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-chameleon-yellow" />
                      Weekly Focus Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.weeklyFocus.map((focus, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-chameleon-yellow-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-chameleon-orange" />
                      Suggested Habits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedPlan.suggestedHabits.map((habit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-chameleon-orange" />
                          <span>{habit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                  Modify Plan
                </Button>
                
                <Button 
                  onClick={savePlan} 
                  className="gap-2 bg-chameleon-gradient hover:opacity-90"
                >
                  <CheckCircle className="h-4 w-4" />
                  Accept & Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
