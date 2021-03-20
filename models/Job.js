const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Job must have company name']
    },
    logo: {
        type: String,
        required: [true, 'Job posting must have company logo']
    },
    new: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        required: [true, 'Job must have position'],
        maxlength:[50, 'Job must have less than 50 characters'],
        minlength: [5, 'Position must have at least 5 characters']
    },
    slug: String,
    role: {
        type: String,

    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    contract: {
        type: String,
        required: [true, 'A job must have a contract'],
        enum:{
            values: ['Part time', 'Full time'],
            message: 'Contract is either Partime or fulltime '
        }
    },
    location: {
        type: String,
        required: [true, 'Job must have a location'],
    },
    languages:{
        type: [String]
    },
    tools:{
        type: [String]
    }
});

const Job =  mongoose.model('Job', jobSchema);

module.export = Job;