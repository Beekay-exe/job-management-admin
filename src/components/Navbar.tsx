'use client';

import { Button, Container, Group, Text, Box } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  onCreateJob?: () => void;
}

export function Navbar({ onCreateJob }: NavbarProps) {
  return (
    <Box 
      style={{ 
        background: 'white',
        padding: '8px 16px',
        margin: '12px auto',
        width: '790px',
        borderRadius: '50px',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)',
        fontFamily: 'Satoshi Variable, sans-serif',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Container size="lg">
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />

          {/* Navigation Links - Centered */}
          <Group gap={32} justify="center" style={{ flex: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text fw={500}>Home</Text>
            </Link>
            <Link href="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text fw={500}>Find Jobs</Text>
            </Link>
            <Link href="/talents" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text fw={500}>Find Talents</Text>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text fw={500}>About us</Text>
            </Link>
            <Link href="/testimonials" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text fw={500}>Testimonials</Text>
            </Link>
          </Group>

          <Button 
            variant="filled"
            size="md"
            radius="xl"
            onClick={onCreateJob}
            styles={{
              root: {
                background: 'linear-gradient(to right, #A128FF, #6100AD)',
                border: 'none',
                '&:hover': {
                  background: 'linear-gradient(to right, #8A20DD, #510094)'
                }
              }
            }}
          >
            Create Jobs
          </Button>
        </Group>
      </Container>
    </Box>
  );
}