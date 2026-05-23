# Access Operations Dashboard

A React prototype for analyzing fictional access-control event logs, identifying failed authentication patterns, and generating operational support insights.

## Live Demo

[https://access-operations-dashboard.vercel.app/](https://access-operations-dashboard.vercel.app/)

## Project Overview

Access Operations Dashboard is a small internal-tool prototype inspired by access-control and facial authentication operations.

The app allows a user to upload a CSV file containing fictional access event logs. It then analyzes the events, calculates operational metrics, identifies the most problematic device, detects the most affected location, and generates a support ticket draft with suggested actions.

This project was built as a practical exercise in using AI-assisted development tools to rapidly create functional internal tools.

## Problem Simulated

Access-control systems can generate many event logs from different devices and locations. Support and operations teams may need to quickly identify:

- which devices are generating the most failed authentication events

- where failures are concentrated

- how severe the issue is

- what actions should be taken next

- how to turn raw event logs into a structured support ticket

This prototype simulates that workflow using fictional data.

## Features

- Upload access-control event logs from a CSV file

- Display event logs in a table

- Calculate total events

- Count failed events and warnings

- Calculate failure rate

- Identify the most problematic device

- Detect the most affected location

- Generate an automated operational insight

- Generate a support ticket draft

- Suggest actions dynamically based on event notes

- Reset the dashboard to sample data

## Required CSV Format

The uploaded CSV file should include the following columns:

```csv

timestamp,location,deviceId,eventType,status,notes

Example row:

```
2026-05-22 08:05,Main Lobby,D-104,Face Authentication,Failed,Lighting conditions may have affected recognition.
```

## Tech Stack

- React
- Vite
- JavaScript
- PapaParse
- Git
- GitHub
- Vercel

## How It Works

1. The app starts with sample fictional access-control events.
2. A user can upload a CSV file with new event logs.
3. PapaParse reads the CSV file and converts it into JavaScript objects.
4. React state updates the dashboard with the uploaded data.
5. The app calculates operational metrics from the event logs.
6. Rule-based logic identifies the most problematic device and affected location.
7. The app generates an operational insight and a support ticket draft.

## Current Logic

The current version uses rule-based logic, not a live AI model.

For example, the app checks event notes for keywords such as:

- lighting
- connectivity
- profile
- enrollment
- authentication
- recognized

Based on those signals, it generates suggested actions for the support ticket.

## Future Improvements

In a production-style version, this prototype could be expanded with:

- AI-generated summaries using an LLM API
- API integration with a real access-control event system
- database storage for historical event logs
- user authentication
- severity scoring based on time windows and failure frequency
- exportable support tickets
- integration with ticketing systems such as Jira, Zendesk, or HubSpot
- Slack or email notifications for high-priority incidents
- charts and trend analysis over time

## Why I Built This

I built this project to practice creating practical internal tools with AI-assisted development.

The goal was to simulate how an operations or support team could turn raw access-control logs into useful insights and structured follow-up actions.

This project demonstrates my ability to:

- learn by building
- use AI tools as a coding assistant
- create a functional React prototype
- work with external CSV data
- analyze operational event logs
- generate rule-based recommendations
- deploy a working app publicly
- explain how a prototype could evolve into a real business tool

