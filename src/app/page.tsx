'use client';

import { useState, useEffect } from 'react';
import { Container, Grid, Button, Group, Modal, Text, Title, Box } from '@mantine/core';
import { JobCard } from '@/components/JobCard';
import { JobFilters } from '@/components/JobFilters';
import { CreateJobForm } from '@/components/CreateJobForm';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar';

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  experience: string;
  postedTime: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again later.');
    }
  };

  const handleFilterChange = (filters: {
    title?: string;
    location?: string;
    jobType?: string;
    salaryRange?: [number, number];
  }) => {
    let filtered = [...jobs];

    if (filters.title) {
      filtered = filtered.filter(job =>
        job.jobTitle.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase() === filters.location!.toLowerCase()
      );
    }

    if (filters.jobType) {
      filtered = filtered.filter(job =>
        job.jobType.toLowerCase() === filters.jobType!.toLowerCase()
      );
    }

    if (filters.salaryRange) {
      filtered = filtered.filter(job =>
        job.salaryMin >= filters.salaryRange![0] &&
        job.salaryMax <= filters.salaryRange![1]
      );
    }

    setFilteredJobs(filtered);
  };

  const handleCreateJob = async (jobData: Omit<Job, 'id' | 'postedTime'>) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create job');
      }

      const newJob = await response.json();
      setJobs(prev => [newJob, ...prev]);
      setFilteredJobs(prev => [newJob, ...prev]);
      close();
    } catch (err) {
      console.error('Error creating job:', err);
      alert('Failed to create job. Please try again.');
    }
  };

  return (
    <Container size="xl" py="xl">
      <Box style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
        <Navbar onCreateJob={open} />
        <JobFilters onFilterChange={handleFilterChange} />

        {error ? (
          <Text color="red" ta="center">{error}</Text>
        ) : (
          <Grid>
            {filteredJobs.map((job) => (
              <Grid.Col key={job.id} span={{ base: 12, sm: 6, lg: 3 }}>
                <JobCard {...job} salary={`₹${job.salaryMin}k - ₹${job.salaryMax}k`} />
              </Grid.Col>
            ))}
          </Grid>
        )}

        <Modal opened={opened} onClose={close} size="xl" title="Create New Job">
          <CreateJobForm onSubmit={handleCreateJob} onCancel={close} />
        </Modal>
      </Box>
    </Container>
  );
}