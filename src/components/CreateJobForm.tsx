'use client';

import { 
  TextInput, 
  Textarea, 
  Select, 
  Button, 
  Stack, 
  Group,
  NumberInput,
  Title,
  Box
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { useForm } from '@mantine/form';

interface CreateJobFormProps {
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export function CreateJobForm({ onSubmit, onCancel }: CreateJobFormProps) {
  const form = useForm({
    initialValues: {
      jobTitle: '',
      companyName: '',
      companyLogo: '',
      location: '',
      jobType: '',
      salaryMin: 50,
      salaryMax: 80,
      description: '',
      experience: '1-3 yr Exp'
    },

    validate: {
      jobTitle: (value) => (!value ? 'Job title is required' : null),
      companyName: (value) => (!value ? 'Company name is required' : null),
      location: (value) => (!value ? 'Location is required' : null),
      jobType: (value) => (!value ? 'Job type is required' : null),
      salaryMin: (value) => (value < 0 ? 'Salary cannot be negative' : null),
      salaryMax: (value, values) => 
        value <= values.salaryMin ? 'Maximum salary must be greater than minimum salary' : null,
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      onSubmit(values);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box style={{ 
      fontFamily: 'Satoshi Variable, sans-serif',
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      <Title order={2} ta="center" fw={700} mb="xl">
        Create Job Opening
      </Title>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Job Title"
            placeholder="e.g., Full Stack Developer"
            required
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            {...form.getInputProps('jobTitle')}
          />

          <TextInput
            label="Company Name"
            placeholder="e.g., Amazon"
            required
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            {...form.getInputProps('companyName')}
          />

          <TextInput
            label="Company Logo URL"
            placeholder="e.g., https://example.com/logo.png"
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            {...form.getInputProps('companyLogo')}
          />

          <Select
            label="Location"
            placeholder="Select location"
            required
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            data={[
              { value: 'bangalore', label: 'Bangalore' },
              { value: 'mumbai', label: 'Mumbai' },
              { value: 'delhi', label: 'Delhi' },
              { value: 'remote', label: 'Remote' }
            ]}
            {...form.getInputProps('location')}
          />

          <Select
            label="Job Type"
            placeholder="Select job type"
            required
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            data={[
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'internship', label: 'Internship' }
            ]}
            {...form.getInputProps('jobType')}
          />

          <Group grow mb="md">
            <NumberInput
              label="Minimum Salary (k)"
              placeholder="50"
              min={0}
              max={1000}
              required
              styles={{
                input: {
                  borderRadius: '8px',
                  '&:focus': {
                    borderColor: '#7950F2'
                  }
                }
              }}
              {...form.getInputProps('salaryMin')}
            />

            <NumberInput
              label="Maximum Salary (k)"
              placeholder="80"
              min={0}
              max={1000}
              required
              styles={{
                input: {
                  borderRadius: '8px',
                  '&:focus': {
                    borderColor: '#7950F2'
                  }
                }
              }}
              {...form.getInputProps('salaryMax')}
            />
          </Group>

          <Select
            label="Experience Required"
            placeholder="Select experience range"
            mb="md"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            data={[
              { value: '0-1 yr Exp', label: '0-1 Years' },
              { value: '1-3 yr Exp', label: '1-3 Years' },
              { value: '3-5 yr Exp', label: '3-5 Years' },
              { value: '5+ yr Exp', label: '5+ Years' }
            ]}
            {...form.getInputProps('experience')}
          />

          <Textarea
            label="Job Description"
            placeholder="Enter job description"
            minRows={4}
            mb="xl"
            styles={{
              input: {
                borderRadius: '8px',
                '&:focus': {
                  borderColor: '#7950F2'
                }
              }
            }}
            {...form.getInputProps('description')}
          />

          <Group justify="space-between" mt="xl">
            <Button 
              variant="default" 
              type="button" 
              onClick={onCancel}
              styles={{
                root: {
                  borderRadius: '8px'
                }
              }}
            >
              Save Draft
            </Button>
            <Button 
              type="submit" 
              color="violet"
              styles={{
                root: {
                  borderRadius: '8px'
                }
              }}
            >
              Create Job
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}