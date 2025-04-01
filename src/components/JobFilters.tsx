import { Group, TextInput, Select, RangeSlider, Box, Text } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';

interface JobFiltersProps {
  onFilterChange: (filters: {
    title?: string;
    location?: string;
    jobType?: string;
    salaryRange?: [number, number];
  }) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);

  return (
    <Box 
      style={{ 
        background: 'white',
        padding: '24px',
        marginBottom: '32px',
        borderRadius: '16px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        fontFamily: 'Satoshi Variable, sans-serif'
      }}
    >
      <Group align="flex-start" grow>
        <TextInput
          placeholder="Search By Job Title, Role"
          leftSection={<IconSearch size={18} color="#666" />}
          styles={{
            input: {
              height: '45px',
              '&:focus': {
                borderColor: '#7950F2'
              }
            }
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterChange({ title: e.target.value })}
        />

        <Select
          placeholder="Preferred Location"
          leftSection={<IconMapPin size={18} color="#666" />}
          data={[
            { value: 'bangalore', label: 'Bangalore' },
            { value: 'mumbai', label: 'Mumbai' },
            { value: 'delhi', label: 'Delhi' },
            { value: 'remote', label: 'Remote' }
          ]}
          styles={{
            input: {
              height: '45px',
              '&:focus': {
                borderColor: '#7950F2'
              }
            }
          }}
          onChange={(value) => onFilterChange({ location: value || undefined })}
        />

        <Select
          placeholder="Job type"
          leftSection={<IconBriefcase size={18} color="#666" />}
          data={[
            { value: 'full-time', label: 'Full-time' },
            { value: 'part-time', label: 'Part-time' },
            { value: 'contract', label: 'Contract' },
            { value: 'internship', label: 'Internship' },
          ]}
          styles={{
            input: {
              height: '45px',
              '&:focus': {
                borderColor: '#7950F2'
              }
            }
          }}
          onChange={(value) => onFilterChange({ jobType: value || undefined })}
        />

        <Box>
          <Group justify="space-between" mb="sm">
            <Text fw={500}>Salary Per Month</Text>
            <Text fw={500} c="dimmed">₹{salaryRange[0]}k - ₹{salaryRange[1]}k</Text>
          </Group>
          <RangeSlider
            min={50}
            max={120}
            step={5}
            minRange={0}
            defaultValue={[50, 80]}
            
            styles={{
              
              thumb: { borderColor: '#000000', backgroundColor: '#000000' },
              bar: { backgroundColor: '#000000' }
            }}
            marks={[
              { value: 50, label: '₹50k' },
              { value: 120, label: '₹120k' }
            ]}
            onChange={(value) => {
              setSalaryRange(value);
              onFilterChange({ salaryRange: value });
            }}
          />
        </Box>
      </Group>
    </Box>
  );
} 