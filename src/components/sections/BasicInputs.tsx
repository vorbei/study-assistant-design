import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { FormItem } from "@/components/ui/form-item";

export function BasicInputs() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Basic Inputs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Buttons */}
        <FormItem vertical>
          <Label>Buttons</Label>
          <div className="space-x-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Danger</Button>
          </div>
        </FormItem>

        {/* Radio Group */}
        <FormItem vertical>
          <Label>Radio Group</Label>
          <RadioGroup defaultValue="option-1">
            <div className="flex flex-col">
              <FormItem noSpace>
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">Option 1</Label>
              </FormItem>
              <FormItem noSpace>
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">Option 2</Label>
              </FormItem>
            </div>
          </RadioGroup>
        </FormItem>

        {/* Checkbox Group */}
        <FormItem vertical>
          <Label>Checkbox</Label>
          <div className="flex flex-col">
            <FormItem noSpace>
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms</Label>
            </FormItem>
            <FormItem noSpace>
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">Subscribe</Label>
            </FormItem>
          </div>
        </FormItem>

        {/* Input */}
        <FormItem vertical>
          <Label>Input</Label>
          <Input placeholder="Type something..." />
        </FormItem>

        {/* Number Input */}
        <FormItem vertical>
          <Label>Number Input</Label>
          <Input type="number" placeholder="0" />
        </FormItem>

        {/* Select */}
        <FormItem vertical>
          <Label>Select</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
              <SelectItem value="2">Option 2</SelectItem>
              <SelectItem value="3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Switch */}
        <FormItem vertical>
          <Label>Switch</Label>
          <FormItem>
            <Switch
              checked={switchValue}
              onCheckedChange={setSwitchValue}
            />
            <Label>Toggle me</Label>
          </FormItem>
        </FormItem>

        {/* Slider */}
        <FormItem vertical>
          <Label>Slider</Label>
          <FormItem>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
            <Label className="min-w-[3rem] text-right">{sliderValue}%</Label>
          </FormItem>
        </FormItem>

        {/* Calendar */}
        <FormItem vertical>
          <Label>Calendar</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </FormItem>
      </div>
    </section>
  );
}