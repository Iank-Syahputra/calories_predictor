import { z } from 'zod';

export const predictionSchema = z.object({
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select your gender',
  }),
  age: z.number({ required_error: 'Age is required' })
    .int('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be at most 120'),
  height_cm: z.number({ required_error: 'Height is required' })
    .min(50, 'Height must be at least 50 cm')
    .max(250, 'Height must be at most 250 cm'),
  weight_kg: z.number({ required_error: 'Weight is required' })
    .min(2, 'Weight must be at least 2 kg')
    .max(300, 'Weight must be at most 300 kg'),
  duration_min: z.number({ required_error: 'Duration is required' })
    .min(1, 'Duration must be at least 1 minute')
    .max(600, 'Duration must be at most 600 minutes'),
  heart_rate: z.number({ required_error: 'Heart rate is required' })
    .min(40, 'Heart rate must be at least 40 bpm')
    .max(220, 'Heart rate must be at most 220 bpm'),
  body_temp_c: z.number({ required_error: 'Body temperature is required' })
    .min(35, 'Body temperature must be at least 35°C')
    .max(42, 'Body temperature must be at most 42°C'),
});

export default predictionSchema;
