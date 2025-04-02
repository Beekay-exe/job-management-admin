import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    console.log('Attempting to connect to database...');
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedTime: 'desc'
      }
    });
    console.log(`Successfully fetched ${jobs.length} jobs`);
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    console.error('Database connection string:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Failed to fetch jobs. Please check server logs for more details.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received job data:', body);


    const requiredFields = ['jobTitle', 'companyName', 'location', 'jobType'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }


    const salaryMin = Number(body.salaryMin);
    const salaryMax = Number(body.salaryMax);
    
    if (isNaN(salaryMin) || isNaN(salaryMax) || salaryMin < 0 || salaryMax < 0) {
      return NextResponse.json(
        { error: 'Invalid salary values' },
        { status: 400 }
      );
    }

    console.log('Attempting to create job in database...');

    const job = await prisma.job.create({
      data: {
        jobTitle: body.jobTitle,
        companyName: body.companyName,
        companyLogo: body.companyLogo || '',
        location: body.location,
        jobType: body.jobType,
        salaryMin: salaryMin,
        salaryMax: salaryMax,
        description: body.description || '',
        experience: body.experience || '',
        postedTime: new Date().toISOString()
      }
    });
    console.log('Job created successfully:', job);

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job:', error);
    console.error('Database connection string:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return NextResponse.json(
      { error: error.message || 'Failed to create job. Please check server logs for more details.' },
      { status: 500 }
    );
  }
}