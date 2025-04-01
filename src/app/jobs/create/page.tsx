'use client';

import { 
  TextInput, 
  Textarea, 
  Select, 
  Button, 
  Container, 
  Paper, 
  Stack, 
  Group,
  Title,
  NumberInput
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Navbar } from '@/components/Navbar';
import { useState } from 'react';

export default function CreateJob() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    applicationDeadline: null as Date | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Implement job creation logic here
  };

  return (
    <main>
      <Navbar />
      <Container size="md" mt="xl">
        <Paper shadow="sm" p="xl" radius="lg" withBorder>
          <Title order={1} mb="xl" style={{ textAlign: 'center' }}>Create Job Opening</Title>
          
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Job Title"
                placeholder="e.g. Full Stack Developer"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                required
              />

              <TextInput
                label="Company Name"
                placeholder="Amazon, Microsoft, Swiggy"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />

              <Group grow>
                <Select
                  label="Location"
                  placeholder="Choose Preferred Location"
                  data={[
                    { value: 'bangalore', label: 'Bangalore' },
                    { value: 'mumbai', label: 'Mumbai' },
                    { value: 'delhi', label: 'Delhi' },
                    { value: 'remote', label: 'Remote' }
                  ]}
                  value={formData.location}
                  onChange={(value) => setFormData({ ...formData, location: value || '' })}
                  required
                />

                <Select
                  label="Job Type"
                  placeholder="FullTime"
                  data={[
                    { value: 'full-time', label: 'Full Time' },
                    { value: 'part-time', label: 'Part Time' },
                    { value: 'contract', label: 'Contract' },
                    { value: 'internship', label: 'Internship' }
                  ]}
                  value={formData.jobType}
                  onChange={(value) => setFormData({ ...formData, jobType: value || '' })}
                  required
                />
              </Group>

              <Group grow>
                <NumberInput
                  label="Salary Range"
                  placeholder="₹0"
                  value={formData.salaryMin}
                  onChange={(value) => setFormData({ ...formData, salaryMin: value?.toString() || '' })}
                  required
                />
                <NumberInput
                  label=" "
                  placeholder="₹12,00,000"
                  value={formData.salaryMax}
                  onChange={(value) => setFormData({ ...formData, salaryMax: value?.toString() || '' })}
                  required
                />
                <DateInput
                  label="Application Deadline"
                  placeholder="Pick a date"
                  value={formData.applicationDeadline}
                  onChange={(date) => setFormData({ ...formData, applicationDeadline: date })}
                  required
                />
              </Group>

              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                minRows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />

              <Group justify="space-between" mt="xl">
                <Button variant="default" leftSection="↓">
                  Save Draft
                </Button>
                <Button type="submit" color="blue" rightSection="»">
                  Publish
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>
    </main>
  );
} 