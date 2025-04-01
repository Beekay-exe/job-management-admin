import { Button, Card, Group, Image, Text, Badge, Stack } from '@mantine/core';
import { IconMapPin, IconBriefcase, IconCurrencyRupee } from '@tabler/icons-react';

interface JobCardProps {
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  experience: string;
  location: string;
  jobType: string;
  salary: string;
  description: string;
  postedTime: string;
}

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}hr Ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d Ago`;
  }
};

export function JobCard({
  companyLogo,
  jobTitle,
  companyName,
  experience,
  location,
  jobType,
  salary,
  description,
  postedTime,
}: JobCardProps) {
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      style={{
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Card.Section p="md">
        <Group justify="space-between" align="flex-start">
          <Image
            src={companyLogo}
            alt={companyName}
            width={50}
            height={50}
            style={{ objectFit: 'contain' }}
          />
          <Badge 
            color="blue.3" 
            variant="light" 
            size="lg"
            styles={{
              root: {
                textTransform: 'none',
                fontWeight: 500
              }
            }}
          >
            {formatTimeAgo(postedTime)}
          </Badge>
        </Group>
      </Card.Section>

      <Stack gap="xs" style={{ flex: 1 }}>
        <Text fw={700} size="lg">
          {jobTitle}
        </Text>

        <Group gap="xs">
          <IconMapPin size={16} color="#666" />
          <Text size="sm" c="dimmed">
            {location}
          </Text>
          <IconBriefcase size={16} color="#666" />
          <Text size="sm" c="dimmed">
            {experience}
          </Text>
          <IconCurrencyRupee size={16} color="#666" />
          <Text size="sm" c="dimmed">
            {salary}
          </Text>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
          {description}
        </Text>
      </Stack>

      <Button 
        variant="filled" 
        fullWidth 
        mt="md" 
        radius="md"
        style={{ 
          marginTop: 'auto',
          backgroundColor: '#00AAFF',
          color: '#FFFFFF'
        }}
        styles={{
          root: {
            '&:hover': {
              backgroundColor: '#0099EA'
            }
          }
        }}
      >
        Apply Now
      </Button>
    </Card>
  );
}