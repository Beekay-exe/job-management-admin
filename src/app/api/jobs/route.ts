import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedTime: 'desc'
      }
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received job data:', body);

    // Validate required fields
    const requiredFields = ['jobTitle', 'companyName', 'location', 'jobType'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate salary values
    const salaryMin = Number(body.salaryMin);
    const salaryMax = Number(body.salaryMax);
    
    if (isNaN(salaryMin) || isNaN(salaryMax) || salaryMin < 0 || salaryMax < 0) {
      return NextResponse.json(
        { error: 'Invalid salary values' },
        { status: 400 }
      );
    }

    // Create the job
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

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create job' },
      { status: 500 }
    );
  }
} 