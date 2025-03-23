
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, CheckCircle } from 'lucide-react';

interface PlanActionsProps {
  onModify: () => void;
  onSave: () => void;
}

const PlanActions = ({ onModify, onSave }: PlanActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button
        variant="outline"
        className="gap-2 text-flex-text font-medium rounded-full hover:bg-flex-green/10 hover:text-flex-green"
        onClick={onModify}
      >
        <Edit className="h-4 w-4" />
        Modify Plan
      </Button>
      
      <Button 
        onClick={onSave} 
        className="gap-2 bg-flex-gradient hover:opacity-90 font-semibold rounded-full"
      >
        <CheckCircle className="h-4 w-4" />
        Accept & Save
      </Button>
    </div>
  );
};

export default PlanActions;
